// src/components/form/FormInputFileUpload.js
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import { Edit, Visibility, Close } from "@mui/icons-material";

const FormInputFileUpload = ({ control, name, label, rules }) => {
  const fileInputRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);

  // Convert file → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box>
          <Typography fontWeight="500" mb={1}>
            {label}
          </Typography>

          {/* Hidden input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const base64 = await toBase64(file);
                onChange(base64); // store base64 in form state
              }
            }}
          />

          {/* Upload Box */}
          <Box
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              border: value ? "2px solid #ccc" : "2px dashed #aaa",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              "&:hover .overlay": { opacity: 1 },
            }}
            onClick={!value ? () => fileInputRef.current.click() : undefined}
          >
            {value ? (
              <>
                <img
                  src={value}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Hover Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  {/* Edit Button */}
                  <IconButton
                    onClick={() => fileInputRef.current.click()}
                    sx={{ bgcolor: "white" }}
                  >
                    <Edit />
                  </IconButton>

                  {/* View Button */}
                  <IconButton
                    onClick={() => setPreviewOpen(true)}
                    sx={{ bgcolor: "white" }}
                  >
                    <Visibility />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Typography color="textSecondary">Upload Image</Typography>
            )}
          </Box>

          {/* Error */}
          {error && (
            <Typography variant="caption" color="error">
              {error.message || "This field is required"}
            </Typography>
          )}

          {/* Image Preview Modal */}
          <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                p: 2,
                bgcolor: "rgba(0,0,0,0.8)",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={() => setPreviewOpen(false)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "white",
                }}
              >
                <Close />
              </IconButton>

              <img
                src={value}
                alt="full-preview"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              />
            </Box>
          </Modal>
        </Box>
      )}
    />
  );
};

export default FormInputFileUpload;
