import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";



import { Helmet } from "react-helmet";
// import ApplicationInformation from "./ApplicationInformation";
import useApplicationSetup from "./hooks/useApplicationSetup";
import { useDispatch, useSelector } from "react-redux";

import { useWatch } from "react-hook-form";
import { useParams } from "react-router";
import useApplicationForm from "./hooks/useApplicationForm";
import ApplicantInformation from "./ApplicantInformation";
import { getProjectCategory } from "../../../../features/projectcategory/projectcategorySlice";
import { getDocumentAccessSetups } from "../../../../features/documentAccessSetup/documentAccessSetupSlice";
import OccupationalInformation from "./OccupationalInformation";
import LoanInformation from "./LoanInformation";
import Guarantor from "./Guarantor";
import Reference from "./Reference";
import JointApplicant from "./JointApplicant";
import RequiredDocuments from "./RequiredDocuments";
import { showErrorToast, showSuccessToast } from "../../../../common/ToastMessage";
import { getApplicationByUUID, updateApplication } from "../../../../features/application/applicationSlice";
import ToolbarApplication from "./ToolbarApplication";




const CreateApplicationInformationIndex = () => {

  const {
    watch,
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    register,
    nrcStates,
    nrcStateLoading,
    regions,
    regionLoading,
    uniqueBrandVehicles,
    uniqueModelVehicles,
    vehicleModal,
    selectedVehicleId,
    selectedProductId,
    dealers,
    customerBanks,
    onSubmit,
    setUploadedFiles,
    uploadedFiles,
    openMediatorModal,
    setOpenMediatorModal,
    users,
    mediatorLoading,
    selectedMediator,
    setSelectedMediator,
    uuid,
    applications
  } = useApplicationForm();

  const { projectCategories, isLoading: categoryIsLoading } = useSelector((state) => state.projectUsersCategories);

  const { documentAccessSetups, isLoading: documentAccessLoading } = useSelector((state) => state.userDocumentAccess);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const lang = useSelector((state) => state.language.lang);

  const { application_fields, applicationSetupsLoading } =
    useApplicationSetup(selectedProductId);

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  const selectedProduct = projectCategories.find(p => p.id === selectedProductId);

  const handleOpenMediatorModal = () => {
    setOpenMediatorModal(true);
  };

  const handleCloseMediatorModal = () => {
    setOpenMediatorModal(false);
  };


  const isSubmitDisabled =
    !selectedProductId ||
    !applications?.applicant_name ||
    applications?.status === "Canceled" ||
    applications?.is_synced === 1;


  // 🟢 When user confirms mediator
  const handleMediatorConfirm = async () => {
    if (!selectedMediator) {
      showErrorToast("Please select a mediator first.");
      return;
    }


    try {
      setIsSubmitting(true);
      await dispatch(
        updateApplication({
          uuid,
          applicationData: { mediator_id: selectedMediator },
        })
      ).unwrap();

      showSuccessToast("Mediator assigned successfully!");
      await dispatch(getApplicationByUUID(uuid)).unwrap();
      handleCloseMediatorModal();
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error updating mediator:", error);
    } finally {
      setIsSubmitting(false);
    }
  };



  useEffect(() => {
    dispatch(getProjectCategory());
    if (selectedProductId) {
      dispatch(getDocumentAccessSetups({ category_id: selectedProductId }));
    }
  }, [dispatch, selectedProductId]);



  if (applicationSetupsLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (

    <Box >
      <Box
        sx={{
          pb: 2,
          "@media (max-width: 760px)": {
            height: "auto",
            position: "relative",
            overflowY: "auto",
          },
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>


        <ToolbarApplication sx={{ p: 5 }}

        />
        <Box
          sx={{
            px: 1,
            pb: 1,
            display: "flex",
            gap: 2,
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
            // position: "fixed"
          }}
        >
          <Box sx={{ width: "100%", flex: 1 }}>
            <ApplicantInformation
              control={control}
              application_fields={application_fields}
              // handleCheckExistingCustomer={handleCheckExistingCustomer}
              nrcStates={nrcStates}
              nrcStateLoading={nrcStateLoading}
              categories={projectCategories}
              categoryIsLoading={categoryIsLoading}
              regions={regions}
              regionLoading={regionLoading}
              lang={lang}
            />
            <OccupationalInformation
              control={control}
              setValue={setValue}
              getValues={getValues}
              application_fields={application_fields}
              lang={lang}
            // typeofBusinesses={typeofBusinesses}
            // isTypeofBusinessesLoading={isTypeofBusinessesLoading}
            // mainBusinessCategories={mainBusinessCategories}
            // isMainBusinessCategoriesLoading={isMainBusinessCategoriesLoading}
            // subBusinessCategories={subBusinessCategories}
            // isSubBusinessCategoriesLoading={isSubBusinessCategoriesLoading}
            />
            <LoanInformation
              control={control}
              application_fields={application_fields}
              setValue={setValue}
              category={selectedProduct}
              watch={watch}
              uniqueBrandVehicles={uniqueBrandVehicles}
              uniqueModelVehicles={uniqueModelVehicles}
              vehicleModal={vehicleModal}
              selectedVehicleId={selectedVehicleId}
              dealers={dealers}
              customerBanks={customerBanks}
            />
            <Guarantor
              control={control}
              application_fields={application_fields}
              // handleCheckExistingCustomer={handleCheckExistingCustomer}
              nrcStates={nrcStates}
              nrcStateLoading={nrcStateLoading}
              categories={projectCategories}
              categoryIsLoading={categoryIsLoading}
              regions={regions}
              regionLoading={regionLoading}
              lang={lang}
            />
            <Reference
              control={control}
              application_fields={application_fields}
              // handleCheckExistingCustomer={handleCheckExistingCustomer}
              nrcStates={nrcStates}
              nrcStateLoading={nrcStateLoading}
              categories={projectCategories}
              categoryIsLoading={categoryIsLoading}
              regions={regions}
              regionLoading={regionLoading}
              lang={lang}
            />
            <JointApplicant
              control={control}
              application_fields={application_fields}
              // handleCheckExistingCustomer={handleCheckExistingCustomer}
              nrcStates={nrcStates}
              nrcStateLoading={nrcStateLoading}
              categories={projectCategories}
              categoryIsLoading={categoryIsLoading}
              regions={regions}
              regionLoading={regionLoading}
              lang={lang}
            />
            {
              selectedProductId && (
                <RequiredDocuments setUploadedFiles={setUploadedFiles} uploadedFiles={uploadedFiles} documentAccessSetups={documentAccessSetups} />
              )
            }


            {/* Submit button */}
            <Box sx={{ display: "flex", p: 5, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenMediatorModal()}
                disabled={isSubmitDisabled}
              >
                Choose Mediator
              </Button>
            </Box>
          </Box>

        </Box>
        {/* 🟡 Mediator Selection Modal */}
        <Modal
          open={openMediatorModal}
          onClose={handleCloseMediatorModal}
          aria-labelledby="mediator-modal-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              minWidth: 360,
              maxWidth: 420,
            }}
          >
            <Typography
              id="mediator-modal-title"
              variant="h6"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Assign Mediator
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Mediator</InputLabel>
              <Select
                value={selectedMediator}
                label="Mediator"
                onChange={(e) => setSelectedMediator(e.target.value)}
                disabled={mediatorLoading}
              >
                {users.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={handleCloseMediatorModal} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleMediatorConfirm}
                variant="contained"
                color="primary"
                disabled={!selectedMediator || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CreateApplicationInformationIndex;
