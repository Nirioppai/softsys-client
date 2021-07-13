import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
interface Props {
  nameToDelete: string;
  isOpen: any;

  handleClose: () => void;
  deleteItem: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    redMessage: {
      color: theme.palette.error.main,
    },
  })
);
export const DeleteDialog: FC<Props> = ({
  nameToDelete,
  isOpen,
  deleteItem,
  handleClose,
}) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle disableTypography id='alert-dialog-title'>
          <Typography variant='h3' component='h2'>
            Delete {nameToDelete}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete {nameToDelete}?
            <br />
          </DialogContentText>
          <Box fontWeight={500} className={classes.redMessage}>
            This action cannot be undone.
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Discard
          </Button>
          <Button onClick={deleteItem} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
