import { Box, InputLabel, MenuItem, Select, FormControl, styled, InputBase, Typography } from "@mui/material";


const StyledInputBase = styled(InputBase)(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.grey[800] ,
    borderRadius: 2,
    color: 'rgba(255,255,255,60%)',
    fontWeight: "400",
    padding: theme.spacing(1, 2),
    width: '100%',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
    },
    // '&.Mui-disabled': {
    //   backgroundColor: theme.palette.action.disabledBackground,
    //   color: theme.palette.text.disabled,
    // },
    // '&.error': {
    //   border: `1px solid ${theme.palette.error.main}`,
    // }
  }));

  const CustomSelect = ({
    id,
    name,
    value,
    onChange,
    options,
    disabled = false,
    placeholder = '',
    type = 'text',
    backgroundColor = 'transparent',
    color = 'inherit',
    fontSize,
    borderRadius = 1,
    paddingX,
    paddingY,
    className,
    label,
    error,
    helperText,
    sx = {},
    ...rest
  }) => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ...sx }}>
      {label && (
        <Typography
          variant="body2"
          sx={{ mb: 0.5, ml: 0.5, color: error ? 'error.main' : 'text.primary' }}
        >
          {label}
        </Typography>
      )}
      <Select
input={<StyledInputBase />}
        value={value}
        onChange={onChange}
        // label={label}
        sx={{
          mt: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "rgba(255,255,255,0.23)"
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <Typography
          variant="caption"
          sx={{ mt: 0.5, ml: 0.5, color: error ? 'error.main' : 'text.secondary' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CustomSelect