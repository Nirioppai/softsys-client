import React from 'react';
import {
    Button,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core/';


export const AddEmployee = () => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleChange = (event: any) => {
    setResult(event.target.value);
  };


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            <Typography variant='h3'>
                Add an Employee
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="outlined-required"
                margin="dense"
                label="First Name"
                defaultValue=" "
                variant="outlined"
                type="text"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                style={{marginBottom:"20px"}}
            />
            <TextField
                id="outlined-required"
                margin="dense"
                label="Middle Name"
                defaultValue=""
                variant="outlined"
                type="text"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                style={{marginBottom:"20px"}}
            />
            <TextField
                required
                id="outlined-required"
                margin="dense"
                label="Last Name"
                defaultValue=""
                variant="outlined"
                type="text"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                style={{marginBottom:"20px"}}
            />
            <TextField
                required
                id="outlined-required"
                margin="dense"
                label="Id"
                defaultValue=""
                variant="outlined"
                type="text"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                style={{marginBottom:"20px"}}
            />
            <TextField
                required
                id="outlined-required"
                margin="dense"
                label="Position"
                defaultValue=""
                variant="outlined"
                type="text"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                style={{marginBottom:"20px"}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEmployee; 