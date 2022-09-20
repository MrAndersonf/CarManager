import React from 'react';
import { style } from './style';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';

export interface IAlert {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface IAlertHandles {
  open: () => void;
  close: () => void;
}

const Alert: React.ForwardRefRenderFunction<IAlertHandles, IAlert> = (
  { title, message, onCancel, onConfirm }: IAlert,
  ref,
) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h3 id="parent-modal-title">{title}</h3>
        <p id="parent-modal-description">{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ marginRight: 1, width: 120 }}
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ width: 120 }}
            color="error"
            onClick={onConfirm}
          >
            Apagar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default React.forwardRef(Alert);
