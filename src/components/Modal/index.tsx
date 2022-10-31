import CloseIcon from "components/Icons/CloseIcon";
import { Box, BoxProps, IconButton, Modal, ModalProps } from "@mui/material";
import { theme } from "theme";
import { ReactNode } from "react";

import * as Styles from "./Modal.styled";

export interface TNModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  children?: ReactNode;
  containerProps?: BoxProps;
}

const TNModal = ({ title, children, containerProps, ...props }: TNModalProps) => {
  return (
    <Modal {...props}>
      <Styles.ModalContainer
        sx={{
          [theme.breakpoints.up("md")]: {
            width: theme.spacing(86),
          },
        }}
        {...containerProps}
      >
        <Box p={3} display="flex" position="relative">
          <Box position="absolute" top={10} right={10}>
            <IconButton
              onClick={() => {
                props.onClose?.({}, "escapeKeyDown");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default TNModal;
