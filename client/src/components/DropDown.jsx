import React from "react";
import { MenuItem, FormControl, Select, InputLabel, Typography, Box, IconButton } from "@mui/material";
import Icon from "@components/Icon";

export default function CustomDropdown({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    disabled = false,
    fullWidth = true,
    clearable = false,
    error = false,
    helperText = "",
}) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const handleClear = (event) => {
        event.stopPropagation();
        onChange("");
    };

    return (
        <FormControl fullWidth={fullWidth} error={error} sx={{ minWidth: 200 }}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                value={value || ""}
                onChange={handleChange}
                displayEmpty
                disabled={disabled}
                renderValue={(selected) =>
                    selected ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography>{selected}</Typography>
                            {clearable && (
                                <IconButton size="small" onClick={handleClear} sx={{ ml: 1 }}>
                                    <Icon name={"clear"} fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    ) : (
                        <Typography sx={{ color: "gray" }}>{placeholder}</Typography>
                    )
                }
                sx={{ bgcolor: "background.paper" }} // Custom styling
            >
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <MenuItem key={index} value={option.value || option}>
                            {option.label || option}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No options available</MenuItem>
                )}
            </Select>
            {helperText && <Typography sx={{ mt: 1, color: "blue" }}>{helperText}</Typography>}
        </FormControl>
    );
}
