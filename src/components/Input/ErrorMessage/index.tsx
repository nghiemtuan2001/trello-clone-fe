import { Box, FormHelperTextProps } from "@mui/material";
import { ElementType } from "react";
import AlertIcon from "components/Icons/AlertRounded";

import { StyledFormHelperText } from "./ErrorMessage.styled";

export interface TNInputErrorMessageProps extends FormHelperTextProps {
  component?: ElementType;
}

const TNInputErrorMessage = ({ children, ...props }: TNInputErrorMessageProps) => {
  return (
    <StyledFormHelperText component="div" {...props}>
      <Box display="flex" alignItems="center">
        {!!props.error && (
          <Box display="flex" alignItems="center" sx={{ mr: 0.75 }}>
            <AlertIcon />
          </Box>
        )}
        {children}
      </Box>
    </StyledFormHelperText>
  );
};

export default TNInputErrorMessage;
