import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  useMediaQuery,
  Container,
  Grid,
  Paper,
  Typography,
  SvgIcon,
} from "@mui/material";

import { Helmet } from "react-helmet";
// import ApplicationInformation from "./ApplicationInformation";
import useApplicationSetup from "./hooks/useApplicationSetup";
import { useDispatch, useSelector } from "react-redux";

import { useWatch } from "react-hook-form";
import { useParams } from "react-router";
import useApplicationForm from "./hooks/useApplicationForm";
import { getProjectCategory } from "../../features/customerUser/projectcategory/projectcategorySlice";
import ApplicantInformation from "./ApplicantInformation";
import OccupationalInformation from "./OccupationalInformation";
import LoanInformation from "./LoanInformation";
import RequiredDocuments from "./RequiredDocuments";
import { getDocumentAccessSetups } from "../../features/customerUser/documentAccessSetup/documentAccessSetupSlice";
import Guarantor from "./Guarantor";
import Reference from "./Reference";
import JointApplicant from "./JointApplicant";
import Banner from "./Banner";
import { useLocation, useNavigate } from "react-router-dom";
import FormInputCheckbox from "../../components/form/FormInputCheckbox";

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
    loading
  } = useApplicationForm();

  const { projectCategories, isLoading: categoryIsLoading } = useSelector(
    (state) => state.projectUsersCategories
  );

  const { documentAccessSetups, isLoading: documentAccessLoading } =
    useSelector((state) => state.userDocumentAccess);

  const dispatch = useDispatch();

  const lang = useSelector((state) => state.language.lang);

  const location = useLocation();
  const navigate = useNavigate();

  const fullName = location.state?.fullName || "";
  const phoneNo = location.state?.phoneNo || "";

  const { application_fields, applicationSetupsLoading } =
    useApplicationSetup(selectedProductId);

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  const selectedProduct = projectCategories.find(
    (p) => p.id === selectedProductId
  );

  const termsAndConditions = useWatch({
    control,
    name: "terms_and_conditions",
  });
  const dataPolicy = useWatch({ control, name: "data_policy" });

  const isSubmitDisabled = !(termsAndConditions && dataPolicy) || loading;

  const handleProductSelect = (productId) => {
    setValue("selectedProduct", productId);
  };

  useEffect(() => {
    if (fullName && phoneNo) {
      setValue("applicant_name", fullName);
      setValue("living_phone_number", phoneNo);
    }
  }, [fullName, phoneNo]);

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getDocumentAccessSetups({ category_id: selectedProductId }));
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
    <Box>
      <Banner />
      <Container maxWidth="lg" sx={{ mt: 1, mb: 3 }}>
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          <Box sx={{ textAlign: "start", p: { xs: 1, sm: 2 } }}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              color="text.primary"
            >
              {lang === "en"
                ? "Select Your Product"
                : "ချေးငွေအမျိုးအစားရွေးချယ်ပါ"}
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {projectCategories.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <Paper
                  onClick={() => handleProductSelect(product.id)}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    borderColor: "primary.main",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {/* ✅ Replace icon with image */}
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={product.image} // <- image URL from your data
                      alt={product.name_en}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="medium"
                    color="text.primary"
                    wordWrap="break-word"
                    whiteSpace="normal"
                  >
                    {lang === "en" ? product.name_en : product.name_mm}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        {
          selectedProduct && (
            <Box sx={{ px: { xs: 1, sm: 2 } }}>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

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
                <Box
                  sx={{
                    px: 1,
                    pb: 1,
                    display: "flex",
                    gap: 2,
                    "@media (max-width: 600px)": {
                      flexDirection: "column",
                    },
                    backgroundColor: "#F5F8FF",
                    // position: "fixed"
                  }}
                >
                  <Box sx={{ width: "100%", flex: 1 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      fontWeight="bold"
                      color="text.primary"
                      sx={{ mb: 3, px: 1, mt: 2 }}
                    >
                      {lang === "en"
                        ? "Personal Information"
                        : "ကိုယ်ရေးအချက်အလက်"}
                    </Typography>
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
                      lang={lang}
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
                    {selectedProductId && (
                      <RequiredDocuments
                        setUploadedFiles={setUploadedFiles}
                        uploadedFiles={uploadedFiles}
                        documentAccessSetups={documentAccessSetups}
                        lang={lang}
                      />
                    )}
                    <Grid>
                      <FormInputCheckbox
                        control={control}
                        label={
                          lang === "en"
                            ? "I agree to Terms & Conditions"
                            : "စည်းကမ်းသတ်မှတ်ချက်များအား သဘောတူပါသည်။"
                        }
                        name="terms_and_conditions"
                      />
                    </Grid>
                    <Grid>
                      <FormInputCheckbox
                        control={control}
                        label={lang === "en" ? "I agree to Data Policy" : "ဒေတာမူဝါဒကို သဘောတူပါသည်။"}
                        name="data_policy"
                      />
                    </Grid>
                    <Box sx={{ display: "flex", p: 5, justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitDisabled}
                        sx={{
                          background: "#17365d",
                          color: "white",
                          py: 1,
                          px: 4,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          "&:hover": {
                            backgroundColor: "#102a49",
                            transform: loading ? "none" : "scale(1.05)",
                            boxShadow: loading ? 0 : 5,
                          },
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        {loading ? (
                          <>
                            <CircularProgress
                              size={22}
                              thickness={5}
                              sx={{ color: "white" }}
                            />
                            {lang === "en" ? "Submitting..." : "တင်သွင်းနေပါသည်..."}
                          </>
                        ) : (
                          <>
                            {lang === "en"
                              ? "Submit Application"
                              : "လျှောက်လွှာအားအတည်ပြုပါမည်"}
                          </>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        }
      </Container >
    </Box >
  );
};

export default CreateApplicationInformationIndex;
