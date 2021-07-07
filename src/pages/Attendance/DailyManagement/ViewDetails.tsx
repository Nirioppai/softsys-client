import React, {useState, FC} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Information as InfoIcon, Check as CheckIcon, Close as CloseIcon } from 'mdi-material-ui';
interface viewDetails {
   data: any;
}
const ViewDetails: FC<viewDetails> = ({data}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
         size='small'
         aria-label='edit applicant'
         style={{ marginRight: '0.25rem' }}
         onClick={handleClickOpen}
      >
         <InfoIcon fontSize='small' />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>
        <DialogContent style={{width: '30vw'}}>
          <DialogContentText id="alert-dialog-description">
          Employee ID: {data.id}<br/>
          Date: {data.date}<br/>
          First Name: {data.firstName}<br/>
          Last Name: {data.lastName}<br/>
          Unit/Department: {data.unit}<br/>
          Status: {data.status}<br/>
          Validated: {data.validation===true?'yes':'no'}<br/>
          Time In: {data.timeIn}<br/>
          Time Out: {data.timeOut}<br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ViewDetails;