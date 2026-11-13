import React, { useState } from "react";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Example documents (replace with API response)
const documentList = [
  { id: 1, web_sys_name_en: "NRC Original Front" },
  { id: 2, web_sys_name_en: "NRC Original Back" },
  { id: 3, web_sys_name_en: "Household Registration Front" },
  { id: 4, web_sys_name_en: "Household Registration Back" },
  { id: 5, web_sys_name_en: "Meter Bill or Ward Recommendation Letter" },
  { id: 6, web_sys_name_en: "Income Proof" },
  { id: 7, web_sys_name_en: "Customer Photo" },
];

const RequiredDocuments = ({
  setUploadedFiles,
  uploadedFiles,
  documentAccessSetups,
  lang,
}) => {
  // --- Convert File to Base64 ---
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // --- Handle File Upload ---
  const handleFileChange = async (e, doc) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);

      setUploadedFiles((prev) => {
        // check if already exists
        const existingIndex = prev.findIndex((item) => item.id === doc.id);
        const newFile = {
          id: doc.id,
          name: doc.web_sys_name_en,
          fileName: file.name,
          base64,
        };

        if (existingIndex !== -1) {
          // replace existing
          const updated = [...prev];
          updated[existingIndex] = newFile;
          return updated;
        } else {
          // add new
          return [...prev, newFile];
        }
      });
    } catch (error) {
      console.error("Error converting file to Base64:", error);
    }
  };

  const isUploaded = (id) => uploadedFiles.some((file) => file.id === id);
  const getFileName = (id) =>
    uploadedFiles.find((file) => file.id === id)?.fileName || "";

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        {lang === "en" ? "Required Documents" : "လိုအပ်သောစာရွက်စာတမ်းများ"}
      </Typography>

      <Grid container spacing={2}>
        {documentAccessSetups.map((doc) => {
          const uploaded = isUploaded(doc.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  height: 160,
                  position: "relative",
                }}
              >
                {uploaded ? (
                  <CheckCircleIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "success.main",
                      fontSize: 22,
                    }}
                  />
                ) : (
                  <CloudUploadIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                  />
                )}

                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, textAlign: "center" }}
                >
                  {doc.web_sys_name_en}
                </Typography>

                <input
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: "none" }}
                  id={`upload-${doc.id}`}
                  onChange={(e) => handleFileChange(e, doc)}
                />

                <label htmlFor={`upload-${doc.id}`}>
                  <Button
                    component="span"
                    variant="text"
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      fontWeight: 500,
                    }}
                  >
                    {uploaded ? "Uploaded" : "Upload File"}
                  </Button>
                </label>

                {uploaded && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      color: "text.secondary",
                      wordBreak: "break-all",
                    }}
                  >
                    {getFileName(doc.id)}
                  </Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RequiredDocuments;
