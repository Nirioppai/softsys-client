import React from 'react';
import {
    Button,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select
} from '@material-ui/core/';

export const AddApplicant = () => {
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
                Add an Applicant
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
            <FormControl variant="outlined" style={{width:"100%"}}>
                <InputLabel 
                    id="demo-simple-select-outlined-label" 
                    shrink 
                    style={{backgroundColor:"#FFFFFF", marginLeft:"-3px", padding:"0 5px"}}
                >
                    Result *
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={result}
                    onChange={handleChange}
                    label="Result"
                    margin="dense"
                >
                    <MenuItem value={"accepted"}>Accepted</MenuItem>
                    <MenuItem value={"in progress"}>In Progress</MenuItem>
                    <MenuItem value={"failed"}>Failed</MenuItem>
                </Select>
            </FormControl>
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

export default AddApplicant; 