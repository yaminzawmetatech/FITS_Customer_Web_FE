// UserSetUpForm.js

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserSetUpForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Name" variant="outlined" fullWidth margin="normal" />
            <TextField label="Email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Message" variant="outlined" fullWidth multiline rows={4} margin="normal" />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default UserSetUpForm;