import React, { useCallback, useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress, Grid } from "@mui/material";
import Accordion from "../../components/Accordion";
import FormInputText from "../../components/form/en/FormInputText";
import { get, intersection, set } from "lodash";
import FormInputNumber from "../../components/form/FormInputNumber";
import { useController, useWatch } from "react-hook-form";
import FormInputDecimal from "../../components/form/FormInputDecimal";
import FormInputDatePicker from "../../components/form/FormInputDatePicker";
import dayjs from "dayjs";
import { PURPOSE_OF_LOAN } from "../../constants/loanInformation";
import FormInputSelect from "../../components/form/FormInputSelect";
import { useDispatch, useSelector } from "react-redux";
import { getFirstDueDateSetupWithParams } from "../../features/customerUser/firstDueDateSetup/firstDueDateSetupSlice";
import { getDownPaymentWithParams } from "../../features/customerUser/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";

// ---------------- PMT CALCULATION ----------------
function calculatePMT(loanAmount, tenor, interestRate) {
  const monthlyInterestRate = interestRate / 12 / 100;
  if (monthlyInterestRate === 0) return Math.round(loanAmount / tenor);
  return Math.round(
    (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -tenor))
  );
}

// ---------------- LOAN DISBURSEMENT CALCULATION ----------------
function calculateLoanDisbursement(
  calculateData,
  downPaymentSetup,
  firstDueDateSetup
) {
  const commencementDate = dayjs();

  const loanAmount = Number(calculateData.loan_amount);
  const totalAmount = Number(calculateData.total_amount);
  const tenor = Number(calculateData.tenor);
  const interestRate = Number(calculateData.interest_rate);
  const vehicleDownPaymentAmount = Number(
    calculateData.vehicle_down_payment_amount || 0
  );

  if (!loanAmount || !tenor || !interestRate) {
    throw new Error("Loan amount, tenor, and interest rate are required.");
  }

  // --- First Due Date ---
  let firstDueDate = commencementDate.clone();
  const commencementDay = Number(commencementDate.format("D"));

  if (
    commencementDay >= firstDueDateSetup.start_day &&
    commencementDay <= firstDueDateSetup.end_day
  ) {
    firstDueDate = firstDueDate.add(firstDueDateSetup.add_to_month, "month");
  } else {
    firstDueDate = firstDueDate.add(
      firstDueDateSetup.add_to_month_for_else,
      "month"
    );
  }
  firstDueDate = firstDueDate.date(firstDueDateSetup.billing_set_up_day);

  // --- Fees ---
  let stampDutyFee = 0;
  let stampDutyFeePercentage = 0;
  if (
    downPaymentSetup.stamp_duty_fee_fixed_amount
  ) {
    stampDutyFee = Number(downPaymentSetup.stamp_duty_fee_fixed_amount);
  }
  else if (
    downPaymentSetup.stamp_duty_fee === "stamp_duty_fee_percent_on_loan_amount"
  ) {
    stampDutyFeePercentage = Number(
      downPaymentSetup.stamp_duty_fee_percentage || 0
    );
    stampDutyFee =
      (loanAmount * downPaymentSetup.stamp_duty_fee_percentage) / 100;
  } else if (
    downPaymentSetup.stamp_duty_fee === "stamp_duty_fee_percent_on_net_amount"
  ) {
    const baseAmount = totalAmount ?? loanAmount;
    stampDutyFee =
      (Number(baseAmount) * Number(downPaymentSetup.stamp_duty_fee_percentage)) / 100;
  }

  let processingFee = 0;
  let processingFeePercentage = 0;
  if (
    downPaymentSetup.processing_fee_fixed_amount
  ) {
    processingFee = Number(downPaymentSetup.processing_fee_fixed_amount);
  }
  else if (
    downPaymentSetup.processing_fee === "processing_fee_percent_on_loan_amount"
  ) {
    processingFeePercentage = Number(
      downPaymentSetup.processing_fee_percentage || 0
    );
    processingFee =
      (loanAmount * downPaymentSetup.processing_fee_percentage) / 100;
  } else if (
    downPaymentSetup.processing_fee === "processing_fee_percent_on_net_amount"
  ) {
    const baseAmount = totalAmount ?? loanAmount;
    processingFee =
      (Number(baseAmount) * Number(downPaymentSetup?.processing_fee_percentage ?? 0)) / 100;
  }

  const totalInitialFee =
    stampDutyFee + processingFee + vehicleDownPaymentAmount;

  let finalDisbursedAmount = loanAmount;
  if (downPaymentSetup.way_to_calculate === "deduct_from_loan_amount") {
    finalDisbursedAmount = loanAmount - totalInitialFee;
  }

  const monthlyInstallment = calculatePMT(loanAmount, tenor, interestRate);

  // --- Pro-rata Interest ---
  const proRataDays = firstDueDate.diff(commencementDate, "day");
  const proRataInterest =
    ((loanAmount * (interestRate / 100)) / 365) * proRataDays;

  // --- Eligibility check ---
  const income = Number(calculateData.income || 0);
  const eligible =
    income >= monthlyInstallment * 3 ? "Eligible" : "Not Eligible";

  return {
    commencement_date: commencementDate.format("YYYY-MM-DD"),
    first_due_date: firstDueDate.format("YYYY-MM-DD"),
    loan_amount: loanAmount,
    tenor,
    interest_rate: interestRate,
    stamp_duty_fee: Number(stampDutyFee.toFixed(2)),
    stamp_duty_fee_percentage: stampDutyFeePercentage,
    processing_fee: Number(processingFee.toFixed(2)),
    processing_fee_percentage: processingFeePercentage,
    total_initial_fee: Number(totalInitialFee.toFixed(2)),
    final_disbursed_amount: Number(finalDisbursedAmount.toFixed(2)),
    monthly_installment: monthlyInstallment,
    pro_rata_days: proRataDays,
    pro_rata_interest: Number(proRataInterest.toFixed(2)),
    total_interest: Number(
      (monthlyInstallment * tenor - loanAmount).toFixed(2)
    ),
    total_amount: Number(
      (loanAmount + monthlyInstallment * tenor + proRataInterest).toFixed(2)
    ),
    income,
    eligible_status: eligible,
  };
}

const LoanInformation = ({
  control,
  setValue,
  application_fields = {},
  category,
  isCalculating,
  watch,
  uniqueBrandVehicles,
  vehicleModal,
  selectedVehicleId,
  dealers,
  customerBanks,
  lang
}) => {
  const dispatch = useDispatch();
  const disabled = useWatch({ control, name: "disabled" });
  const { downPaymentSetups } = useSelector((state) => state.userDownPaymentSetups);
  const { firstDueDateSetups } = useSelector(
    (state) => state.userFirstDueDateSetups
  );

  const stamp_duty_percentage = useWatch({
    control,
    name: "stamp_duty_percentage",
  });

  const address_township_id = useWatch({
    control,
    name: "address_township_id",
  });

  const stamp_duty_fees = useWatch({
    control,
    name: "stamp_duty_fees",
  });

  const total_amount = useWatch({
    control,
    name: "total_amount",
  });

  const vehicle_down_payment_ratio = useWatch({
    control,
    name: "vehicle_down_payment_ratio",
  });

  const vehicle_down_payment_amount = useWatch({
    control,
    name: "vehicle_down_payment_amount",
  });

  const insurance_premium_fees = useWatch({
    control,
    name: "insurance_premium_fees",
  });

  const down_payment_amount = useWatch({
    control,
    name: "down_payment_amount",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const processing_percentage = useWatch({
    control,
    name: "processing_percentage",
  });

  const processing_fees = useWatch({
    control,
    name: "processing_fees",
  });

  const commencement_date = useWatch({
    control,
    name: "commencement_date",
  });

  const loan_term_duration = useWatch({
    control,
    name: "loan_term_duration",
  });

  const sub_category_id = useWatch({
    control,
    name: "sub_category_id",
  });

  const interest_rate = useWatch({
    control,
    name: "interest_rate",
  });

  const monthly_interest_rate = useWatch({
    control,
    name: "monthly_interest_rate",
  });

  const dealer_disbursed_ratio = useWatch({
    control,
    name: "dealer_disbursed_ratio",
  });

  const net_disbursement_amount = useWatch({
    control,
    name: "net_disbursement_amount",
  });

  const disbursed_based_on_package_setup = useWatch({
    control,
    name: "disbursed_based_on_package_setup",
  });

  const package_fees = useWatch({
    control,
    name: "package_fees",
  });

  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fees",
    control,
  });

  // Auto calculate loan amount & interest_rate
  useEffect(() => {
    // if (total_amount && vehicle_down_payment_ratio >= 0) {
    //   const loanAmount =
    //     parseFloat(total_amount || 0) -
    //     (parseFloat(total_amount || 0) * parseFloat(vehicle_down_payment_ratio || 0)) / 100;
    //   setValue("loan_amount", loanAmount.toFixed(2), { shouldValidate: true });
    // }
    if (category) {
      setValue("interest_rate", category.interest_rate || 0, {
        shouldValidate: true,
      });
      dispatch(getDownPaymentWithParams({ category_id: category.id }));
      dispatch(getFirstDueDateSetupWithParams({ category_id: category.id }));
    }
    // if (firstDueDate) {
    //   setValue("first_due_date", dayjs(firstDueDate), { shouldValidate: true });
    // }
  }, [total_amount, vehicle_down_payment_ratio, category, setValue, dispatch]);

  // Auto calculate first due date when disbursed date changes
  const interestRate = watch("interest_rate");

  useEffect(() => {
    if (downPaymentSetups?.length && firstDueDateSetups?.length) {
      try {
        const data = {
          loan_amount,
          tenor: loan_term_duration,
          interest_rate: interestRate,
          vehicle_down_payment_amount,
          total_amount,
        };

        const resultData = calculateLoanDisbursement(
          data,
          downPaymentSetups[0],
          firstDueDateSetups[0]
        );

        setValue("monthly_installment", resultData.monthly_installment, {
          shouldValidate: true,
        });
        setValue("stamp_duty_fees", resultData.stamp_duty_fee, {
          shouldValidate: true,
        });
        setValue(
          "stamp_duty_percentage",
          resultData.stamp_duty_fee_percentage,
          { shouldValidate: true }
        );
        setValue("processing_fees", resultData.processing_fee, {
          shouldValidate: true,
        });
        setValue(
          "processing_percentage",
          resultData.processing_fee_percentage,
          { shouldValidate: true }
        );
        setValue("commencement_date", dayjs(resultData.commencement_date), {
          shouldValidate: true,
        });
        setValue("first_due_date", dayjs(resultData.first_due_date), {
          shouldValidate: true,
        });
        setValue("pro_rata_interest", resultData.pro_rata_interest, {
          shouldValidate: true,
        });
        setValue("net_disbursement_amount", resultData.final_disbursed_amount, {
          shouldValidate: true,
        });
        // setValue("total_interest", resultData.total_interest, { shouldValidate: true });
        // setValue("total_amount", resultData.total_amount, { shouldValidate: true });
        setValue("down_payment_amount", resultData.total_initial_fee, {
          shouldValidate: true,
        });
        setValue("interest_rate", resultData.interest_rate, {
          shouldValidate: true,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [
    downPaymentSetups,
    firstDueDateSetups,
    loan_amount,
    loan_term_duration,
    vehicle_down_payment_amount,
    interestRate, // ✅ use the watched value, not the function
  ]);

  const calculateFee = (type, loanAmount, totalAmount) => {
    if (
      type === "stamp_duty_fee_percent_on_loan_amount" ||
      type === "processing_fee_percent_on_loan_amount"
    ) {
      return loanAmount;
    }

    if (type === null || type === undefined) {
      return loanAmount;
    }

    return totalAmount;
  };

  useEffect(() => {
    const baseAmount = calculateFee(
      downPaymentSetups[0]?.stamp_duty_fee,
      loan_amount,
      total_amount
    );

    if (stamp_duty_percentage !== "") {
      const fee = (+stamp_duty_percentage / 100) * baseAmount;
      const rounded = Math.round(fee / 100) * 100;
      setValue("stamp_duty_fees", Math.round(rounded));
    }
  }, [stamp_duty_percentage, loan_amount, stamp_duty_fee_field]);

  useEffect(() => {
    if (get(application_fields, "total_amount")) {
      if (!total_amount) {
        setValue("loan_amount", 0);
        setValue("vehicle_down_payment_amount", 0);
        return;
      }

      let calculatedDownPaymentAmount = 0;
      if (vehicle_down_payment_ratio) {
        calculatedDownPaymentAmount =
          (total_amount * vehicle_down_payment_ratio) / 100;
        setValue("vehicle_down_payment_amount", calculatedDownPaymentAmount);
        setValue("loan_amount", total_amount - calculatedDownPaymentAmount);
      }
    }
  }, [
    total_amount,
    vehicle_down_payment_ratio,
    vehicle_down_payment_amount,
    //categoryId,
    setValue,
    application_fields,
  ]);

  // Local calculation function
  // const handleCalculateProrataDisbursement = useCallback(() => {
  //   try {
  //     const calculateData = {
  //       loan_amount,
  //       tenor: loan_term_duration,
  //       interest_rate,
  //       disbursedDate: commencement_date,
  //       income: 0, // can pass applicant income
  //       vehicle_down_payment_amount: vehicle_down_payment_amount || 0,
  //     };

  //     const downPaymentSetup = {
  //       stamp_duty_fee: "stamp_duty_fee_percent_on_net_amount", // or fixed
  //       stamp_duty_fee_percentage: stamp_duty_percentage ?? 0,
  //       stamp_duty_fee_fixed_amount: stamp_duty_fees ?? 0,
  //       processing_fee: "processing_fee_percent_on_net_amount", // or fixed
  //       processing_fee_percentage: processing_percentage ?? 0,
  //       processing_fee_fixed_amount: processing_fees ?? 0,
  //       way_to_calculate: "deduct_from_loan_amount",
  //     };

  //     const firstDueDateSetup = {
  //       start_day: 1,
  //       end_day: 15,
  //       add_to_month: 1,
  //       add_to_month_for_else: 2,
  //       billing_set_up_day: 1,
  //     };

  //     const result = calculateLoanDisbursement(
  //       calculateData,
  //       downPaymentSetup,
  //       firstDueDateSetup
  //     );

  //     // Push results into form
  //     setValue("monthly_installment", result.monthly_installment);
  //     setValue("prorata_interest", result.pro_rata_interest);
  //     setValue("first_due_date", dayjs(result.first_due_date));
  //     setValue("stamp_duty_fees", result.stamp_duty_fee);
  //     setValue("processing_fees", result.processing_fee);
  //     setValue("net_disbursement_amount", result.final_disbursed_amount);

  //     console.log("Calculation Result:", result);
  //   } catch (e) {
  //     console.error("Calculation error", e);
  //   }
  // }, [
  //   loan_amount,
  //   loan_term_duration,
  //   interest_rate,
  //   commencement_date,
  //   stamp_duty_percentage,
  //   stamp_duty_fees,
  //   processing_percentage,
  //   processing_fees,
  //   setValue,
  // ]);

  const fields = [
    "dealer_id",
    "school_name",
    "yearly_school_fees",
    "total_amount",
    "vehicle_down_payment_ratio",
    "loan_amount",
    "vehicle_down_payment_amount",
    "interest_rate",
    "monthly_interest_rate",
    "loan_term_duration",
    "commencement_date",
    "first_due_date",
    "monthly_installment",
    "prorata_interest",
    "stamp_duty_percentage",
    "stamp_duty_fees",
    "processing_percentage",
    "processing_fees",
    "net_disbursement_amount",
    "purpose_of_loan",
    "purpose_of_loan_remark",
    "customer_bank_id",
    "account_name",
    "account_no",
    "vehicle_id",
    "vehicle_color",
    "down_payment_amount",
    "package_fees",
    "disbursed_based_on_package_setup",
  ];

  if (isCalculating) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCalculating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title={lang === "en" ? "Loan Detail" : "ချေးငွေအသေးစိတ်"}>
        <Box sx={{ mt: 1 }}>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={6}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {get(application_fields, "dealer_id") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={dealers}
                    getOptionLabel={(option) => option?.name || ""}
                    id="id"
                    label="Travel Agency Name"
                    name="dealer_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.dealer_id.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "school_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="School Name"
                    name="school_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.school_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "yearly_school_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Yearly of School Fees"
                    name="yearly_school_fees"
                    disabled={disabled}
                    rules={{
                      required: application_fields.yearly_school_fees.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "total_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label={
                      application_fields.total_amount.value || "Total Amount"
                    }
                    name="total_amount"
                    disabled={disabled}
                    rules={{
                      required: application_fields?.total_amount?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "vehicle_down_payment_ratio") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    label={
                      application_fields?.vehicle_down_payment_ratio?.value ||
                      "Vehicle Down Payment Ratio"
                    }
                    name="vehicle_down_payment_ratio"
                    disabled={disabled}
                    options={[
                      { id: 30, label: "30%" },
                      { id: 40, label: "40%" },
                      { id: 50, label: "50%" },
                      { id: 60, label: "60%" },
                      { id: 70, label: "70%" },
                      { id: 80, label: "80%" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    id="id"
                    rules={{
                      required:
                        application_fields?.vehicle_down_payment_ratio
                          ?.required, // dynamic required
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "loan_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label={application_fields?.loan_amount?.value}
                    name="loan_amount"
                    disabled={disabled}
                    rules={{
                      required: application_fields?.loan_amount?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "vehicle_down_payment_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label={
                      application_fields?.vehicle_down_payment_amount?.value ||
                      "Vehicle Down Payment Amount"
                    }
                    name="vehicle_down_payment_amount"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields?.vehicle_down_payment_amount
                          ?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "loan_term_duration") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label={
                      application_fields?.loan_term_duration?.value ||
                      "Loan Term Duration (months)"
                    }
                    name="loan_term_duration"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields?.loan_term_duration?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {/* <Grid item xs={7} lg={10} sm={7}>
                <FormInputDatePicker
                  control={control}
                  label="Commencement Date"
                  name="commencement_date"
                />
              </Grid>
              <Grid item xs={2} lg={2} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCalculateProrataDisbursement}
                  sx={{ width: "80px" }}
                  disabled={disabled}
                >
                  Calculate
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormInputDatePicker
                  control={control}
                  label="First Due Date"
                  name="first_due_date"
                  disabled
                />
              </Grid> */}
            </Grid>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={6}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {get(application_fields, "monthly_installment") && (
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Monthly Installment"
                    name="monthly_installment"
                    disabled
                  />
                </Grid>
              )}
              {get(application_fields, "purpose_of_loan") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={PURPOSE_OF_LOAN}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Purpose of Loan"
                    name="purpose_of_loan"
                    disabled={disabled}
                    rules={{
                      required: application_fields.purpose_of_loan.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "purpose_of_loan_remark") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Purpose of Loan Remark"
                    name="purpose_of_loan_remark"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.purpose_of_loan_remark.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "brand_name") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={uniqueBrandVehicles}
                    getOptionLabel={(option) => option?.brand_name}
                    id="web_sys_brand_id"
                    label="Brand"
                    name="brand_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.brand_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "model_name") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={vehicleModal}
                    getOptionLabel={(option) => option?.model_name}
                    id="web_sys_model_id"
                    label="Model"
                    name="model_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.model_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "customer_bank_payment_channel_id") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={customerBanks}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    label="Customer Bank Payment Channel"
                    name="customer_bank_id"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.customer_bank_payment_channel_id
                          .required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "account_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Account Name"
                    name="account_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.account_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "account_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Account No"
                    name="account_no"
                    disabled={disabled}
                    rules={{
                      required: application_fields.account_no.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "color") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Color"
                    name="vehicle_color"
                    disabled={disabled}
                    rules={{
                      required: application_fields.color.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "stamp_duty_percentage") && (
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Stamp Duty %"
                    name="stamp_duty_percentage"
                    disabled
                    rules={{
                      required:
                        application_fields.stamp_duty_percentage.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "stamp_duty_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Stamp Duty Fee"
                    disabled
                    name="stamp_duty_fees"
                    rules={{
                      required: application_fields.stamp_duty_fees.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "processing_percentage") && (
                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Processing %"
                    name="processing_percentage"
                    disabled
                    rules={{
                      required:
                        application_fields.processing_percentage.required, // Set required dynamically
                    }}
                    // onFocus={handleProcessingFeePercentage}
                  />
                </Grid>
              )}
              {get(application_fields, "processing_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Processing Fee"
                    name="processing_fees"
                    disabled
                    rules={{
                      required: application_fields.processing_fees.required, // Set required dynamically
                    }}
                    // onFocus={handleProcessingFee}
                  />
                </Grid>
              )}
              <></>
            </Grid>
          </Grid>
        </Box>
      </Accordion>
    );
  }
  return <></>;
};

export default LoanInformation;
