import { FC } from 'react';
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import { IEmployee } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { postEmployee } from 'services';

interface AddEmployeeModalProps extends DialogProps {
  onClose: () => void;
  onAdd: (employee: IEmployee) => void;
}

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({
  onClose,
  onAdd,
  ...rest
}) => {
  const showError = useErrorMessageRenderer();

  const handleSubmit = async (values: any) => {
    try {
      // * Replace with this when integrating with actual API
      // const { data } = await postEmployee(values);
      // onAdd(data);

      // * Remove this when integrating with actual API
      await postEmployee(values);
      onAdd({
        ...values,
        _id: new Date().toString(),
        birthDate: '',
        nationality: '',
        contactNumber: '',
        address: '',
        position: '',
      });
    } catch (err) {
      showError(err);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    middleName: Yup.string(),
    lastName: Yup.string().required('Required'),
    suffix: Yup.string(),
    employeeId: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        employeeId: '',
        gender: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ touched, errors, isSubmitting, resetForm }) => (
        <Dialog
          {...rest}
          onClose={() => {
            resetForm();
            onClose();
          }}
          disableBackdropClick={isSubmitting}
          disableEscapeKeyDown={isSubmitting}
        >
          <Form>
            <DialogTitle disableTypography>
              <Typography variant='h3' component='h2'>
                Add Employee
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Field
                component={TextField}
                autoFocus
                required
                name='firstName'
                autoComplete='given-name'
                label='First Name'
              />
              <Field
                component={TextField}
                name='middleName'
                autoComplete='additional-name'
                label='Middle Name'
              />
              <Field
                component={TextField}
                required
                name='lastName'
                autoComplete='family-name'
                label='Last Name'
              />
              <Field
                component={TextField}
                name='suffix'
                autoComplete='honorific-suffix'
                label='Suffix'
              />
              <Field
                component={TextField}
                required
                name='employeeId'
                label='Employee ID'
              />
              <FormControl
                required
                variant='outlined'
                fullWidth
                error={touched.gender && !!errors.gender}
              >
                <InputLabel htmlFor='gender'>Gender</InputLabel>
                <Field
                  component={Select}
                  required
                  name='gender'
                  label='Gender'
                  margin='none'
                  inputProps={{
                    id: 'gender',
                  }}
                >
                  <MenuItem value='' disabled>
                    Select an option
                  </MenuItem>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Field>
                <ErrorMessage component={FormHelperText} name='gender' />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                disabled={isSubmitting}
              >
                Discard
              </Button>
              <Button variant='contained' type='submit' disabled={isSubmitting}>
                Add
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default AddEmployeeModal;
