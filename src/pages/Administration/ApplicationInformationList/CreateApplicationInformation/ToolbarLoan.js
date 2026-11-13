import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../../../components/Toolbar";
import ToolbarApplicationCancelButton from "./ToolbarApplicationCancelButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalculateIcon from "@mui/icons-material/Calculate";
import SmsIcon from "@mui/icons-material/Sms";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {
  createInitialPaymentCalculation,
  getInitialPaymentCalculation,
} from "features/initialPaymentCalculation/initialPaymentCalSlice";
import openNewWindow from "utils/windowUtils";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import {
  createInsuranceInspection,
  getInsuranceInspections,
} from "features/insuranceInspection/insuranceInspectionSlice";
import PaymentIcon from "@mui/icons-material/Payment";
import { createGeneratedSMS } from "features/smsGenerate/smsGenerateSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  applicationCompleteFlagChange,
} from "features/application/applicationSlice";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { createPrepareForContracts } from "features/prepareForContract/prepareForContractSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createVehicleInformation,
  getVehicleInformation,
} from "features/vehicleInformation/vehicleInformationSlice";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import axiosInstance from "features/api/axiosInstance";
import { saveAs } from "file-saver";
import axiosInstanceV2 from "features/api/axiosInstanceV2";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const ToolbarApplication = ({
  applicationResponses,
  application_fields_group,
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { application } = useSelector((state) => state.applicationDetail);
  const { user } = useSelector((state) => state.auth);
  const { id, categoryId } = useParams();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const { initialPaymentCalculations } = useSelector(
    (state) => state.initialPaymentCalculations
  );

  const [exporting, setExporting] = useState(false);

  const { isLoading: isSmsLoading } = useSelector((state) => state.smsGenerate);

  const { isLoading: initialPaymentCalLoading } = useSelector(
    (state) => state.initialPaymentCalculations
  );

  const { isLoading: insuranceInspectionsLoading } = useSelector(
    (state) => state.insuranceInspections
  );

  const handleOpenCancelModal = useCallback(() => {
    setOpenCancelModal(true);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setOpenCancelModal(false);
  }, []);

  useEffect(() => {
    dispatch(getSubCategory());
    if (id) {
      dispatch(
        getInitialPaymentCalculation({
          params: {
            application_id: id,
          },
        })
      );
    }
  }, [dispatch, id]);

  const handleClickInitialPaymentCal = async () => {
    const url = `/loan-module/contract-preparation/${application?.uuid}/${application?.id}/initial-payment-calculation`;

    try {
      // Fetch initial payment calculation
      const response = await dispatch(
        getInitialPaymentCalculation({
          params: {
            application_id: application?.id,
          },
        })
      );

      // If data exists, open the URL in a new window
      if (response.data?.length > 0) {
        openNewWindow(url);
      } else {
        // If no data exists, create a new initial payment calculation
        const createResponse = await dispatch(
          createInitialPaymentCalculation({
            body: {
              application_id: application?.id ?? null,
              insurance_company_id:
                application?.application_info?.insurance_company ?? null,
              vehicle_color:
                application?.application_info?.vehicle_color ?? null,
              brand_id: application?.application_info?.brand_id ?? null,
              model_id: application?.application_info?.model_id ?? null,
              category_id: application?.category_id ?? null,
              sub_category_id: application?.sub_category_id ?? null,
              engine_no: application?.application_info?.engine_no ?? null,
              engine_power: application?.application_info?.engine_power ?? null,
              year_of_manufacture:
                application?.application_info?.year_of_manufacture ?? null,
              manufacturer: application?.application_info?.manufacturer ?? null,
              loan_term_duration: application?.assessment_tenor ?? null,
              net_disbursed_amount:
                application?.assessment_net_disbursed_amount ?? null,
              insurance_premium_fee:
                application?.assessments.length > 0
                ? application?.assessments[0]?.insurance_premium_fee
                : application?.application_info?.insurance_premium_fees ?? null,
              commencement_date:  application?.assessment_commencement_date ?? null, 
              first_due_date: application?.assessment_first_due_date ?? null,
              total_amount: application?.application_info?.total_amount ?? null,
              stamp_duty_fee_percentage:
                application?.assessment_stamp_duty_percentage ?? null,
              stamp_duty_fee_amount:
                application?.assessment_stamp_duty_fees ?? null,
              processing_fee_percentage:
                application?.assessment_processing_percentage ?? null,
              processing_fee_amount:
                application?.assessment_processing_fees ?? null,
              interest_rate: application?.assessment_interest_rate ?? null,
              prorata_interest:
                application?.assessment_prorata_interest ?? null,
              monthly_interest_rate:
                application?.application_info?.monthly_interest_rate ?? null,
              monthly_installment:
                application?.assessment_monthly_installment_amount ?? null,

              vehicle_down_payment_ratio:
                application?.assessment_vehicle_down_payment_ratio ?? null,
              vehicle_down_payment_amount:
                application?.assessment_vehicle_down_payment_amount ?? null,
              down_payment_amount:
                application?.assessment_down_payment_amount ?? null,
              loan_amount: application?.assessment_approved_amount ?? null,
              division: application?.application_info?.division ?? null,
              plate_no: application?.application_info?.plate_no ?? null,
              chassis_no: application?.application_info?.chassis_no ?? null,

              dealer_disbursed_ratio:
                application?.assessment_dealer_disbursed_ratio ?? null,
              dealer_disbursed_amount:
                application?.assessment_dealer_disbursed_amount ?? null,
              customer_disbursed_ratio:
                application?.assessment_customer_disbursed_ratio ?? null,
              customer_disbursed_amount:
                application?.assessment_customer_disbursed_amount ?? null,
              disbursed_based_on_package_setup:
                application?.assessment_disbursed_based_on_package_setup ??
                null,
            },
          })
        );

        // If creation is successful, open the URL in a new window
        if (createResponse.payload.success) {
          openNewWindow(url);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickViewContract = () => {
    const url = `/loan-module/contract-preparation/${application?.uuid}/${application?.id}/view-contract`;
    openNewWindow(url);
  };

  const handleVehicleInformation = async () => {
    const url = `/loan-module/${application?.category?.name}/vehicle-info/${application?.uuid}/${application?.id}`;

    try {
      // Fetch initial payment calculation
      const response = await dispatch(
        getVehicleInformation({
          params: {
            application_id: application?.id,
          },
        })
      );

      // If data exists, open the URL in a new window
      if (response.data?.length > 0) {
        openNewWindow(url);
      } else {
        // If no data exists, create a new initial payment calculation

        const createResponse = await dispatch(
          createVehicleInformation({
            data: {
              // application_id:
              // initialPaymentCalculations[0]?.application_id ?? null,
              application_id: application?.id,
              initial_downpayment_id:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.initial_downpayment_id ?? null,
              vehicle_color:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.vehicle_color ?? null,
              division:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.division ?? null,
              plate_no:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.plate_no ?? null,
              chassis_no:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.chassis_no ?? null,
              engine_no:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.engine_no ?? null,
              engine_power:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.engine_power ?? null,
              year_of_manufacture:
                initialPaymentCalculations[0]?.vehicle_information[0]
                  ?.year_of_manufacture ?? null,
              brand_id:
                initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
                  ?.brand_id ?? null,
              model_id:
                initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
                  ?.model_id ?? null,
              category_id:
                initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
                  ?.category_id ?? null,
              sub_category_id:
                initialPaymentCalculations[0]?.vehicle_information[0]?.vehicle
                  ?.sub_category_id ?? null,
            },
          })
        );

        // If creation is successful, open the URL in a new window
        if (createResponse.payload.success) {
          openNewWindow(url);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickInsuranceInspection = async () => {
    try {
      // Fetch insurance inspection
      const response = await dispatch(
        getInsuranceInspections({
          params: {
            application_id: application?.id,
          },
        })
      );

      // If data exists, open the URL in a new window
      if (response?.payload.data?.length > 0) {
        openNewWindow(
          `/loan-module/insurance-inspection/${response.payload.data[0]?.uuid}/${application?.id}`
        );
      } else {
        // If no data exists, create a new initial payment calculation
        const createResponse = await dispatch(
          createInsuranceInspection({
            body: {
              application_id: application?.id,
            },
          })
        );

        // If creation is successful, open the URL in a new window
        if (createResponse.payload.success) {
          openNewWindow(
            `/loan-module/insurance-inspection/${createResponse.payload.data?.uuid}/${application?.id}`
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickCOR = () => {
    openNewWindow(
      `/loan-module/sign-loan-agreement/${application?.uuid}/${application?.id}`
    );
  };

  const handleClickReadyForContract = async () => {
    try {
      await dispatch(
        applicationCompleteFlagChange({
          data: {
            application_id: application?.id,
            is_contract_ready: 1,
          },
        })
      ).unwrap();
      showSuccessToast("This application is ready for contract");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickReadyForDisbursement = async () => {
    try {
      const responseData = await dispatch(
        createPrepareForContracts({ uuids: [application?.uuid] })
      );

      if (responseData) {
        if (responseData.payload.success === true) {
          let path = `/LoanOperationModule/preparation-for-contract?${responseData.payload.data
            .map((data) => `uuids=${data.uuid}`)
            .join("&")}`;
          navigate(path);
        } else {
          toast.error(responseData.payload, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      showErrorToast(
        CommonMessage.MFE00009.replace("%s", "setting Disbursement Date")
      );
    }
  };

  const handleGenerateSms = useCallback(async () => {
    try {
      const body = {
        // Define the necessary data structure for SMS generation
      };
      await dispatch(
        createGeneratedSMS({
          ...body,
          application_id: id,
          sms_type: "application",
          application_status: application?.status?.toLowerCase(),
          category_id: categoryId,
          sub_category_id: application?.sub_category_id,
        })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00007);
    } catch (error) {
      console.error("Error generating SMS:", error);
    }
  }, [dispatch, id]);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstanceV2.get(
        "/download-sms-histories-excel",
        {
          params: {
            application_id: id,
            is_exported: 0,
          },
          responseType: "arraybuffer", // Ensure binary data response
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "SMSHistory.xlsx");
    } catch (error) {
      if (error.response && error.response.data) {
        // Convert ArrayBuffer to text
        const decoder = new TextDecoder("utf-8");
        const errorText = decoder.decode(error.response.data);
        const parsedError = JSON.parse(errorText);
        const errorMessage = parsedError.message || "An unknown error occurred";
        showErrorToast(errorMessage);
      }
      // Show error toast
    } finally {
      setExporting(false);
    }
  };

  const handleExportCOR = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/applications/${application?.uuid}/cor-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? application?.id + " COR.pdf"
          : application?.id + " COR.doc"
      );
      // saveAs(blob, contract?.application?.application_id + " Agreement." + contract?.category_id === 3 ? 'pdf' : 'doc');
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  }, [application]);

  const handleExportATD = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/applications/${application?.uuid}/atd-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? application?.application_id + " ATD.pdf"
          : application?.application_id + " ATD.doc"
      );
      // saveAs(blob, contract?.application?.application_id + " Agreement." + contract?.category_id === 3 ? 'pdf' : 'doc');
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  }, [application]);

  const handleExportUL = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/applications/${application?.uuid}/ul-pdf`,
        {
          responseType: "arraybuffer",
        }
      );

      const fileExtension = response.headers["content-type"];

      let mimeType = "";

      if (fileExtension === "application/pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "application/msword") {
        mimeType = "application/msword";
      } else if (
        fileExtension ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }

      const blob = new Blob([response.data], {
        type: mimeType,
      });
      saveAs(
        blob,
        fileExtension === "application/pdf"
          ? application?.application_id + " UL.pdf"
          : application?.application_id + " UL.doc"
      );
      // saveAs(blob, contract?.application?.application_id + " Agreement." + contract?.category_id === 3 ? 'pdf' : 'doc');
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  }, [application]);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        ...(user?.user_group === "CMCO" ||
          user?.user_group === "CMCE" ||
          user?.user_group === "Agent"
          ? [
            {
              title: "Contract Preparation",
              type: "multiple",
              children: [
                {
                  icon: <PaymentIcon />,
                  title: "Down Payment",
                  url:
                    user?.user_group === "CMCO" ||
                      user?.user_group === "CMCE" ||
                      user?.user_group === "Agent"
                      ? `/loan-module/attachment/${application?.uuid}/Application Downpayment/${application?.id}`
                      : `/loan-module/down-payment-list/${application?.id}/${application?.uuid}`,
                },
              ],
            },
            ...(application?.status === "Approved"
              ? [
                {
                  title: "Contract",
                  type: "multiple",
                  children: [
                    {
                      icon: <RemoveRedEyeIcon />,
                      title: "View Contract",
                      onClick: handleClickViewContract,
                    },
                  ],
                },
              ]
              : []),
            ...(application?.status === "Approved"
              ? [
                {
                  title: "Documents",
                  type: "multiple",
                  children: [
                    {
                      icon: <EditIcon />,
                      title: "Sign Loan Agreement",
                      onClick: handleClickCOR,
                    },
                    ...(application?.category_id === 4
                      ? [
                        {
                          icon: <DocumentScannerIcon />,
                          title: "COR",
                          onClick: handleExportCOR,
                        },
                        {
                          icon: <DocumentScannerIcon />,
                          title: "ATD",
                          onClick: handleExportATD,
                        },
                        {
                          icon: <DocumentScannerIcon />,
                          title: "UL",
                          onClick: handleExportUL,
                        },
                      ]
                      : []),
                  ],
                },
              ]
              : []),
            {
              title: "Attachment",
              type: "multiple",
              children: [
                {
                  icon: <AttachFileIcon />,
                  title: "Application Attachments",
                  disabled: !(
                    categoryId &&
                    application?.sub_category_id &&
                    id &&
                    application?.application_id
                  ),
                  url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/Application/${id}`,
                },
                {
                  icon: <AttachFileIcon />,
                  title: "Sale Invoice",
                  url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/Sale Invoice/${id}`,
                },
              ],
            },
          ]
          : [
            {
              title: "Contract Preparation",
              type: "multiple",
              children: [
                ...(application?.status === "Approved"
                  ? [
                    {
                      //icon: <CalculateIcon />,
                      title: "Initial Payment Calculation",
                      onClick: handleClickInitialPaymentCal,
                      icon: initialPaymentCalLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <CalculateIcon />
                      ),
                    },
                  ]
                  : []),
                {
                  // icon: <SmsIcon />,
                  icon: isSmsLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <SmsIcon />
                  ),
                  title: "Generate SMS",
                  onClick: handleGenerateSms,
                },
                {
                  // icon: <SmsIcon />,
                  icon: exporting ? (
                    <CircularProgress size={20} />
                  ) : (
                    <FileDownloadIcon />
                  ),
                  title: "SMS Excel Export",
                  onClick: handleExport,
                },
                ...(application?.status === "Approved" &&
                  application?.sub_category?.required_inspection === 1
                  ? [
                    {
                      // icon: <PriceCheckIcon />,
                      title: "Insurance Inspection",
                      onClick: handleClickInsuranceInspection,
                      icon: insuranceInspectionsLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <PriceCheckIcon />
                      ),
                    },
                  ]
                  : []),

                ...(application?.status === "Approved"
                  ? [
                    {
                      icon: <PaymentIcon />,
                      title: "Down Payment",
                      url: `/loan-module/down-payment-list/${application?.id}/${application?.uuid}`,
                    },
                    ...(application_fields_group.includes(
                      "Financed Vehicle Information"
                    )
                      ? [
                        {
                          icon: <DirectionsCarFilledIcon />,
                          title: "Add Vehicle Information",
                          onClick: handleVehicleInformation,
                        },
                      ]
                      : []),
                  ]
                  : []),
              ],
            },
            ...(application?.status === "Approved"
              ? [
                {
                  title: "Contract Process",
                  type: "multiple",
                  children: [
                    {
                      icon: <CheckCircleOutlineIcon />,
                      title: "Ready For Contract",
                      onClick: handleClickReadyForContract,
                      disabled: application?.is_contract_ready === 1,
                    },
                    {
                      icon: <RemoveRedEyeIcon />,
                      title: "View Contract",
                      onClick: handleClickViewContract,
                    },
                    {
                      icon: <LocalAtmIcon />,
                      title: "Ready For GL",
                      onClick: handleClickReadyForDisbursement,
                      disabled:
                        application?.is_contract_ready === 0 ||
                        !(
                          application?.is_signature_complete === 1 &&
                          application?.is_disbursed === 0
                        ),
                    },
                  ],
                },
              ]
              : []),
            ...(application?.status === "Approved"
              ? [
                {
                  title: "Documents",
                  type: "multiple",
                  children: [
                    {
                      icon: <EditIcon />,
                      title: "Sign Loan Agreement",
                      onClick: handleClickCOR,
                    },
                    ...(application?.category_id === 4
                      ? [
                        {
                          icon: <DocumentScannerIcon />,
                          title: "COR",
                          onClick: handleExportCOR,
                        },
                        {
                          icon: <DocumentScannerIcon />,
                          title: "ATD",
                          onClick: handleExportATD,
                        },
                        {
                          icon: <DocumentScannerIcon />,
                          title: "UL",
                          onClick: handleExportUL,
                        },
                      ]
                      : []),
                  ],
                },
              ]
              : []),
            ...(application?.status === "Approved"
              ? [
                {
                  title: "Attachment",
                  type: "multiple",
                  children: [
                    {
                      icon: <AttachFileIcon />,
                      title: "Application Attachments",
                      disabled: !(
                        categoryId &&
                        application?.sub_category_id &&
                        id &&
                        application?.application_id
                      ),
                      url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/Application/${id}`,
                    },
                    {
                      icon: <AttachFileIcon />,
                      title: "Sale Invoice",
                      url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/Sale Invoice/${id}`,
                      disabled: application?.is_signature_complete === 0,
                    },
                  ],
                },
              ]
              : []),
          ]),
      ],
    },
  ];

  return (
    <>
      <ToolbarApplicationCancelButton
        open={openCancelModal}
        handleClose={handleCloseCancelModal}
        applicationResponses={applicationResponses}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ToolbarApplication);
