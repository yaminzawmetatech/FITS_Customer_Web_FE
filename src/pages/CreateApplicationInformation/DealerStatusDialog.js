import React from "react";
import { Grid, Box, Modal, Typography, Button } from "@mui/material";

const DealerStatusDialog = ({ open, onClose, guaranteeCount }) => {
    const { application_stage_with_dealer, contract_stage_with_dealer, dealer_guarantee_value } = guaranteeCount?.data || {};

    let statusMessage = "";

    if (application_stage_with_dealer === 0 && contract_stage_with_dealer === 0) {
        statusMessage = `This dealer has not yet started the application process or formalized any contracts. As a result, no vehicle sales have been recorded this month, despite a dealer guarantee value of ${dealer_guarantee_value} units. The current status is classified as 'Under Limit,' highlighting a critical gap in expected performance.`;
    } else if (application_stage_with_dealer !== 0 && contract_stage_with_dealer === 0) {
        statusMessage = `This dealer has initiated the application process but has not yet finalized any contracts. Consequently, no vehicle sales have been registered this month. The status remains 'Under Limit.' Prioritizing contract finalization will be essential to achieving sales targets.`;
    } else if (application_stage_with_dealer !== 0 && contract_stage_with_dealer !== 0) {
        statusMessage = `This dealer has successfully completed the application process (${application_stage_with_dealer}) and established formal contracts (${contract_stage_with_dealer}). However, no vehicle sales have been recorded this month, falling short of the dealer guarantee value of ${dealer_guarantee_value} units. Despite progress in paperwork, further efforts are needed to translate agreements into actual sales.`;
    }


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "40rem",
                    backgroundColor: "white",
                    margin: "auto",
                    mt: "5rem",
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 24,
                }}
            >
                {/* Title */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Dealer Sales Status
                </Typography>
                <Grid item xs={12}>
                    <Typography variant="body1">{statusMessage}</Typography>
                </Grid>
                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Modal>





    );
};

export default DealerStatusDialog;
