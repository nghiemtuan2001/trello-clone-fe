import styled from '@emotion/styled';
import { FormHelperText } from '@mui/material';

export const StyledFormHelperText = styled(FormHelperText)`
  margin: ${({ theme }) => theme.spacing(0.5)} 0 0 0;
  font-size: ${({ theme }) => theme.spacing(1.75)};
`;
