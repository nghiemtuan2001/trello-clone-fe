import styled from '@emotion/styled';
import { TabUnstyled } from '@mui/base';

export const StyledTab = styled(TabUnstyled)`
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: transparent;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
  border: none;
  border-radius: ${({ theme }) => theme.spacing(2)};
  line-height: ${({ theme }) => theme.spacing(3)};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }

  &.Mui-selected {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;
