import styled from '@emotion/styled';
import { TabsListUnstyled } from '@mui/base';

export const TabsListStyled = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(0.5)};
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border-radius: ${({ theme }) => theme.spacing(2)};
`;
