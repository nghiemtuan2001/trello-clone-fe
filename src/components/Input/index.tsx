import AlertRounded from "components/Icons/AlertRounded";
import { FormControl, FormControlProps, InputAdornment, OutlinedInputProps } from "@mui/material";
import { theme } from "theme";
import React, { RefObject } from "react";

import TNInputErrorMessage from "./ErrorMessage";
import { BaseOutlinedInput, BaseOutlinedInputProps, StyledFormLabel } from "./Input.styled";

export interface TNInputProps extends OutlinedInputProps, BaseOutlinedInputProps {
  helperText?: string;
  maxLength?: number;
  containerRef?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
  containerProps?: FormControlProps;
  backgroundColor?: string;
}

const TNInput = ({
  fullWidth,
  label,
  helperText,
  error,
  backgroundColor,
  required,
  containerRef,
  containerProps,
  ...props
}: TNInputProps) => {
  return (
    <FormControl fullWidth={fullWidth} error={error} required={required} {...containerProps}>
      {!!label && (
        <StyledFormLabel error={false} focused={false} required={required}>
          {label}
        </StyledFormLabel>
      )}
      <BaseOutlinedInput
        ref={containerRef}
        sx={{
          backgroundColor: backgroundColor || theme.palette.common.white,
        }}
        endAdornment={
          error && (
            <InputAdornment position="end" sx={{ mr: 2 }} disablePointerEvents>
              <AlertRounded />
            </InputAdornment>
          )
        }
        {...props}
      />
      {!!helperText && <TNInputErrorMessage error={error}>{helperText}</TNInputErrorMessage>}
    </FormControl>
  );
};

export default TNInput;
