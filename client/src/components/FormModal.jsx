import { Box, Modal, Paper, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomInput from './CustomInput';
import CustomSelect from './CustomInput/CustomSelect';
import Button from './buttons/Button';

const FormModal = ({
    open,
    handleClose,
    title = "Create Item",
    fields = [],
    initialValues = {},
    action,
    onSuccess
}) => {
    const [formState, setFormState] = useState({});
    const theme = useTheme();

    useEffect(() => {
        if (!open) return; // Only run when modal is open
    
        const isEmptyInitialValues = Object.keys(initialValues || {}).length === 0;
    
        const fallbackValues = fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {});
    
        setFormState(isEmptyInitialValues ? fallbackValues : initialValues);
    }, [open]); 

    const handleChange = (key) => (e) => {
        setFormState((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSave = async () => {
        const res = await action(formState);
        setFormState({});
        handleClose();
        if (onSuccess) onSuccess(res);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: theme.palette.background.paper,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h3" mb={2}>
                        {title}
                    </Typography>

                    {fields.map((field) => (
                        <Box key={field.name} my={4}>
                            {field.type === "select" ? (
                                <CustomSelect
                                    fullWidth
                                    label={field.label}
                                    value={formState[field.name] || ""}
                                    onChange={handleChange(field.name)}
                                    options={field.options || []}
                                />
                            ) : (
                                <CustomInput
                                    fullWidth
                                    label={field.label}
                                    value={formState[field.name] || ""}
                                    onChange={handleChange(field.name)}
                                />
                            )}
                        </Box>
                    ))}

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button outlined label="Cancel" color="primary" onClick={handleClose} />
                        <Button variant="contained" label="Save" color="primary" onClick={handleSave} />
                    </Box>
                </Paper>
            </Box>
        </Modal>
    );
};

export default FormModal;
