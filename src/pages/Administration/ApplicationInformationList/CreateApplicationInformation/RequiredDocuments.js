import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const RequiredDocuments = ({ uploadedFiles = [], lang }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const isImage = (fileName = "") =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
  const isPDF = (fileName = "") => /\.pdf$/i.test(fileName);

  const handlePreview = (file) => {
    if (isImage(file.fileName)) {
      setPreviewImage(file.server_url);
      setPreviewOpen(true);
    } else if (isPDF(file.fileName)) {
      window.open(file.server_url, "_blank");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Required Documents
      </Typography>

      {uploadedFiles.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No uploaded documents available
        </Typography>
      ) : (
        <Grid container spacing={2} px={10}>
          {uploadedFiles.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 2,
                  position: "relative",
                  height: "auto",
                  cursor:
                    isImage(file.fileName) || isPDF(file.fileName)
                      ? "pointer"
                      : "default",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform:
                      isImage(file.fileName) || isPDF(file.fileName)
                        ? "scale(1.02)"
                        : "none",
                  },
                }}
                onClick={() => handlePreview(file)}
              >
                <CheckCircleIcon
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "success.main",
                    fontSize: 22,
                  }}
                />

                {/* --- Image Box with Aspect Ratio --- */}
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "6 / 3",
                    borderRadius: 1,
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  {isImage(file.fileName) ? (
                    <Box
                      component="img"
                      src={file.server_url}
                      alt={file.fileName}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : isPDF(file.fileName) ? (
                    <PictureAsPdfIcon
                      sx={{ fontSize: 60, color: "error.main" }}
                    />
                  ) : (
                    <ImageNotSupportedIcon
                      sx={{ fontSize: 60, color: "text.secondary" }}
                    />
                  )}
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: 500 }}
                >
                  {file.name}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center",
                    wordBreak: "break-all",
                    mt: 0.5,
                  }}
                >
                  {file.fileName}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* --- Image Preview Dialog --- */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <IconButton
          onClick={() => setPreviewOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: 0, backgroundColor: "black" }}>
          {previewImage && (
            <Box
              component="img"
              src={previewImage}
              alt="Preview"
              sx={{
                width: "100%",
                height: "80vh",
                objectFit: "contain",
                display: "block",
                margin: "auto",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RequiredDocuments;
