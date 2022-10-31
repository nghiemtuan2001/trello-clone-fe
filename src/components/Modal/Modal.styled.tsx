import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: ${({ theme }) => theme.spacing(1)};
  margin-left: auto;
  margin-right: auto;
  max-height: 90vh;
  max-width: 95vw;
  overflow-y: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
