import styled from '@emotion/styled';
import { FormHelperText, FormHelperTextProps, FormLabel, OutlinedInput } from '@mui/material';
import { ElementType } from 'react';

export interface StyledFormHelperTextProps extends FormHelperTextProps {
  component?: ElementType;
}

export interface BaseOutlinedInputProps {
  width?: number;
  height?: number;
}

export const StyledFormLabel = styled(FormLabel)`
  color: ${({ theme }) => theme.palette.common.black};
  padding-bottom: ${({ theme }) => theme.spacing(0.5)};
  line-height: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.spacing(2)};
  font-weight: 500;
`;

export const StyledFormHelperText = styled(FormHelperText)<StyledFormHelperTextProps>`
  margin: ${({ theme }) => theme.spacing(0.5)} 0 0 0;
  font-size: ${({ theme }) => theme.spacing(1.75)};
`;

export const BaseOutlinedInput = styled(OutlinedInput)<BaseOutlinedInputProps>`
  border-radius: ${({ theme }) => theme.spacing(2)};
  width: ${({ width, theme }) => width && theme.spacing(width)};
  height: ${({ height, theme, multiline }) => !multiline && theme.spacing(height || 6)};
  padding: 0;

  &.Mui-error {
    color: ${({ theme }) => theme.palette.error.main};
  }

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.grey[350]};
  }

  input,
  textarea {
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
    font-size: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.palette.common.black};
    line-height: ${({ theme }) => theme.spacing(3)};
    font-weight: 400;
  }
`;
