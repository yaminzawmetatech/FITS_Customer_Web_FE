import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Switch,
  Box,
} from "@mui/material";
import FormInputSelect from "../../../components/form/FormInputSelect";
import FormInputText from "../../../components/form/FormInputText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInputRadio from "../../../components/form/FormInputRadio";
import { useWatch } from "react-hook-form";
import FormInputCheckbox from "../../../components/form/FormInputCheckbox";

export const CreateEditAccountCodeModal = ({
  open,
  onClose,
  projectCategories,
  setEditValues,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  handleCategorySelect,
  setValue,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
      setShowStampDutyFee(false);
      setShowProcessingFee(false);
      setValue("stamp_duty_fee", "");
      setValue("processing_fee", "");
      setValue("way_to_calculate", "");
      setValue("category_id", "");
      setValue("sub_category_id", "");
      setValue("description", "");
      setValue("interest_before_first_installment_prorata_interest", "");
      setValue("insurance", "");
    }
  }, [editFlag, open, reset, setValue]);

  const [showProcessingFee, setShowProcessingFee] = useState(false); // show process box flag
  const [showStampDutyFee, setShowStampDutyFee] = useState(false); // show stamp duty box flag
  const [showStampDutyPercentage, setShowStampDutyPercentage] = useState(false); //stamp duty percentage box already shown
  const [showStampDutyFixedAmount, setShowStampDutyFixedAmount] =
    useState(false); //stamp duty percentage box already shown
  const [showProcessingFeePercentage, setShowProcessingFeePercentage] =
    useState(false); //stamp duty percentage box already shown
  const [showProcessingFeeFixedAmount, setShowProcessingFeeFixedAmount] =
    useState(false); //stamp duty percentage box already shown

  useEffect(() => {
    if (editFlag === true) {
      if (
        editValues.processing_fee !== "---" ||
        editValues.processing_fee_percentage !== "---" ||
        editValues.processing_fee_fixed_amount !== "---"
      ) {
        setShowProcessingFee(true);
      } else {
        setShowProcessingFee(false);
      }

      if (
        editValues.stamp_duty_fee !== "---" ||
        editValues.processing_fee_fixed_amount !== "---" ||
        editValues.stamp_duty_fee_fixed_amount !== "---" ||
        editValues.stamp_duty_fee_fixed_amount !== "---"
      ) {
        setShowStampDutyFee(true);
      } else {
        setShowStampDutyFee(false);
      }
    }
  }, [editValues, open]);

  const stampDuty = [
    { key: "Stamp Duty Percentage" },
    { key: "Stamp Duty Fixed Amount" },
  ];

  const stampDutyFee = [
    {
      id: "stamp_duty_fee_percent_on_loan_amount",
      key: "Stamp Duty Fees % On Loan Amount",
    },
    {
      id: "stamp_duty_fee_percent_on_net_amount",
      key: "Stamp Duty Fees % On Selling Price",
    },
  ];

  const processing = [
    { id: "processing_percent", key: "Processing Fee Percentage" },
    { id: "processing_fixed_amt", key: "Processing Fee Fixed Amount" },
  ];

  const processingFee = [
    {
      id: "processing_fee_percent_on_loan_amount",
      key: "Processing Fees % On Loan Amount",
    },
    {
      id: "processing_fee_percent_on_net_amount",
      key: "Processing Fees % On Selling Price",
    },
  ];

  const wayToCalculate = [
    // { id: "add_on_loan_amount", key: "Add on Loan Amount" },
    { id: "deduct_from_loan_amount", key: "Deduct from Loan Amount" },
    { id: "paid_advanced_by_customer", key: "Paid Advanced by Customer" },
  ];

  // on/off stamp duty switch
  const handleStampDutySwitchChange = () => {
    if (!showStampDutyFee) {
      setValue("stamp_duty_fee", "");
      setValue("stamp_duty_fee_fixed_amount", "");
      setValue("stamp_duty_fee_percentage", "");
    }
    setValue("stamp_duty", stampDutyAction);
    setShowStampDutyFee(!showStampDutyFee);
  };

  // on/off processing fees switch
  const handleProcessingFeeSwitchChange = () => {
    if (!showProcessingFee) {
      setValue("processing_fee", "");
      setValue("processing_fee_fixed_amount", "");
      setValue("processing_fee_percentage", "");
    }
    setValue("processing", processingAction);
    setShowProcessingFee(!showProcessingFee);
  };

  //stamp dudy radio with usewatch
  const stampDutyAction = useWatch({
    control,
    name: "stamp_duty",
  });

  const processingAction = useWatch({
    control,
    name: "processing",
  });

  useEffect(() => {
    if (stampDutyAction === "Stamp Duty Fixed Amount") {
      setValue("stamp_duty_fee", "");
      setValue("stamp_duty_fee_percentage", "");
      setShowStampDutyPercentage(false);
      setShowStampDutyFixedAmount(true);
    } else {
      setValue("stamp_duty_fee_fixed_amount", "");
      setShowStampDutyPercentage(true);
      setShowStampDutyFixedAmount(false);
    }
  }, [setValue, stampDutyAction]);

  useEffect(() => {
    if (processingAction === "Processing Fee Fixed Amount") {
      setValue("processing_fee", "");
      setValue("processing_fee_percentage", "");
      setShowProcessingFeePercentage(false);
      setShowProcessingFeeFixedAmount(true);
    } else {
      setValue("processing_fee_fixed_amount", "");
      setShowProcessingFeePercentage(true);
      setShowProcessingFeeFixedAmount(false);
    }
  }, [setValue, processingAction]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Down Payment Scheme"
          : "Initial Payment Scheme"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={projectCategories}
            getOptionLabel={(option) => option?.name_en || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{
              required: true,
            }}
            onSelect={handleCategorySelect}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText
            multiline
            key="Description"
            control={control}
            label="Description"
            name="description"
            sx={{
              pt: 1,
              textarea: {
                minHeight: "130px",
                maxHeight: "130px",
                overflow: "auto !important",
              },
            }}
          />
        </Stack>
        <Stack direction="row" sx={{ alignItems: "center", marginTop: "30px" }}>
          <FormLabel>
            <h4>Initial Down Payment</h4>
          </FormLabel>
        </Stack>

        <Stack sx={{ marginBottom: "20px", marginTop: "10px" }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Items in the Initial Payment
            </FormLabel>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showStampDutyFee || false}
                  onChange={handleStampDutySwitchChange}
                />
              }
              label="Stamp Duty"
            />
          </Stack>
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: 3,
              px: 3,
              py: 1,
              display: showStampDutyFee ? "block" : "none",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", py: 3 }}>
              <FormInputRadio
                control={control}
                options={stampDuty}
                id="key"
                name="stamp_duty"
                row={true}
              />
            </Stack>
            <Box sx={{ display: showStampDutyPercentage ? "block" : "none" }}>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "200px", sm: "160px", md: "400px" },
                  gap: "1.5rem",
                }}
              >
                <FormInputText
                  key="StampDutyPercent"
                  control={control}
                  label="Stamp Duty %"
                  name="stamp_duty_fee_percentage"
                />
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center", py: 2 }}>
                <FormInputRadio
                  control={control}
                  options={stampDutyFee}
                  id="id"
                  name="stamp_duty_fee"
                  readOnly={true}
                />
              </Stack>
            </Box>
            <Box sx={{ display: showStampDutyFixedAmount ? "block" : "none" }}>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "200px", sm: "160px", md: "400px" },
                  gap: "1.5rem",
                  pb: 2,
                }}
              >
                <FormInputText
                  key="StampDutyFixed"
                  control={control}
                  label="StampDuty Fixed Amount"
                  name="stamp_duty_fee_fixed_amount"
                />
              </Stack>
            </Box>
          </Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Stack direction="row" sx={{ py: 1, alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showProcessingFee || false}
                    onChange={handleProcessingFeeSwitchChange}
                  />
                }
                label="Processing Fees"
              />
            </Stack>
          </Stack>
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: 3,
              px: 3,
              py: 1,
              display: showProcessingFee ? "block" : "none",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", py: 3 }}>
              <FormInputRadio
                control={control}
                options={processing}
                id="key"
                name="processing"
                row={true}
                readOnly={true}
              />
            </Stack>

            <Box
              sx={{ display: showProcessingFeePercentage ? "block" : "none" }}
            >
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "200px", sm: "160px", md: "400px" },
                  gap: "1.5rem",
                  mt: 1,
                }}
              >
                <FormInputText
                  key="ProcessingFeesPercent"
                  control={control}
                  label="Processing Fees %"
                  name="processing_fee_percentage"
                />
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center", pt: 3 }}>
                <FormInputRadio
                  control={control}
                  options={processingFee}
                  id="id"
                  name="processing_fee"
                />
              </Stack>
            </Box>
            <Box
              sx={{ display: showProcessingFeeFixedAmount ? "block" : "none" }}
            >
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "200px", sm: "160px", md: "400px" },
                  gap: "1.5rem",
                  mt: 1,
                }}
              >
                <FormInputText
                  key="ProcessingFeesFixed"
                  control={control}
                  label="Processing Fees Fixed Amount"
                  name="processing_fee_fixed_amount"
                />
              </Stack>
            </Box>
          </Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <FormInputCheckbox
              control={control}
              label="Interest Before first Installment/Prorata Interest"
              name="interest_before_first_installment_prorata_interest"
            />
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <FormInputCheckbox
              control={control}
              label="Insurance"
              name="insurance"
            />
          </Stack>
          {/* <Stack direction="row" sx={{ alignItems: "center" }}>
            <FormInputCheckbox
              control={control}
              label="Product Downpayment"
              name="insurance"
            />
          </Stack> */}
        </Stack>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Way To Calculate
          </FormLabel>
          <FormInputRadio
            control={control}
            options={wayToCalculate}
            id="id"
            name="way_to_calculate"
          />
        </FormControl>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
              setShowStampDutyFee(false);
              setShowProcessingFee(false);
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit((data) => onSubmit(data, editFlag))();
            }}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAccountCodeModal;
