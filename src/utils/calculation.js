import dayjs from "dayjs";

// Helper to calculate PMT (monthly installment)
export function calculatePMT(loanAmount, tenor, interestRate) {
  const monthlyInterestRate = (interestRate / 12) / 100;
  const totalPayments = tenor;

  if (monthlyInterestRate === 0) {
    return Math.round(loanAmount / totalPayments);
  }

  const monthlyInstallment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  return Math.round(monthlyInstallment);
}

// Main loan disbursement calculator
export function calculateLoanDisbursement(calculateData, downPayment, firstDueDateSetup) {
  const commencementDate = dayjs(calculateData.commencement_date);
  const loanAmount = Number(calculateData.loan_amount);
  const tenor = Number(calculateData.tenor);
  const interestRate = Number(calculateData.interest_rate);

  if (!loanAmount || !tenor || !interestRate) {
    throw new Error("Loan amount, tenor, and interest rate are required.");
  }

  // --- First Due Date
  let firstDueDate = commencementDate.clone();
  const commencementDay = Number(commencementDate.format("D"));

  if (
    commencementDay >= firstDueDateSetup.start_day &&
    commencementDay <= firstDueDateSetup.end_day
  ) {
    firstDueDate = firstDueDate.add(firstDueDateSetup.add_to_month, "month");
  } else {
    firstDueDate = firstDueDate.add(firstDueDateSetup.add_to_month_for_else, "month");
  }

  if (!firstDueDateSetup.billing_set_up_day) {
    throw new Error("Billing setup day is required in First Due Date setup.");
  }
  firstDueDate = firstDueDate.date(firstDueDateSetup.billing_set_up_day);

  // --- Pro-rata Interest
  const tenorZeroDate = firstDueDate.clone().subtract(1, "month");
  const prorataDateDifference = tenorZeroDate.startOf("day").diff(
    commencementDate.startOf("day"),
    "day"
  );
  const dailyInterest = ((loanAmount * interestRate) / 100) / 365;
  const prorataInterest = Math.round(prorataDateDifference * dailyInterest);

  // --- Fees (stamp duty + processing)
  let stampDutyFee = 0;
  if (downPayment.stamp_duty_fee === "stamp_duty_fee_percent_on_net_amount") {
    stampDutyFee = (loanAmount * downPayment.stamp_duty_fee_percentage) / 100;
  } else if (downPayment.stamp_duty_fee === "stamp_duty_fee_fixed_amount") {
    stampDutyFee = Number(downPayment.stamp_duty_fee_fixed_amount);
  }

  let processingFee = 0;
  if (downPayment.processing_fee === "processing_fee_percent_on_net_amount") {
    processingFee = (loanAmount * downPayment.processing_fee_percentage) / 100;
  } else if (downPayment.processing_fee === "processing_fee_fixed_amount") {
    processingFee = Number(downPayment.processing_fee_fixed_amount);
  }

  // --- Extra Add-ons
  const insuranceAmount =
    downPayment.insurance === 1
      ? Number(calculateData.insurance_premium_fee || 0)
      : 0;

  let totalInitialFee = stampDutyFee + processingFee;
  if (downPayment.interest_before_first_installment_prorata_interest === 1) {
    totalInitialFee += prorataInterest;
  }
  if (downPayment.insurance === 1) {
    totalInitialFee += insuranceAmount;
  }

  // --- Way To Calculate
  let finalDisbursedAmount = loanAmount;
  if (downPayment.way_to_calculate === "deduct_from_loan_amount") {
    finalDisbursedAmount = loanAmount - totalInitialFee;
  }

  // --- Interest & Totals
  const monthlyInstallment = calculatePMT(loanAmount, tenor, interestRate);
  const totalInterest = monthlyInstallment * tenor - loanAmount;
  const totalAmount = loanAmount + totalInterest;

  return {
    commencement_date: commencementDate.format("YYYY-MM-DD"),
    first_due_date: firstDueDate.format("YYYY-MM-DD"),
    loan_amount: loanAmount,
    tenor,
    interest_rate: interestRate,
    prorata_interest: prorataInterest,
    stamp_duty_fee: Number(stampDutyFee.toFixed(2)),
    processing_fee: Number(processingFee.toFixed(2)),
    insurance_premium_fee: insuranceAmount,
    total_initial_fee: Number(totalInitialFee.toFixed(2)),
    final_disbursed_amount: Number(finalDisbursedAmount.toFixed(2)),
    monthly_installment: monthlyInstallment,
    total_interest: Number(totalInterest.toFixed(2)),
    total_amount: Number(totalAmount.toFixed(2)),
  };
}
