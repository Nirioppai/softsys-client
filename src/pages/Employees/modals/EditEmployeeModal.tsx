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
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import * as Yup from 'yup';
import { IEmployee } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { postEmployee } from 'services';

interface EditEmployeeModalProps extends DialogProps {
  onClose: () => void;
  onSave: (employee: IEmployee) => void;
  employee: IEmployee;
}

const EditEmployeeModal: FC<EditEmployeeModalProps> = ({
  onClose,
  onSave,
  employee,
  ...rest
}) => {
  const showError = useErrorMessageRenderer();

  const { _id, ...initialValues } = employee;

  const handleSubmit = async (values: any) => {
    try {
      // * Replace with this when integrating with actual API
      // const { data } = await putEmployee(_id, values);
      // onSave(data);

      // * Remove this when integrating with actual API
      await postEmployee(values);
      onSave({ ...employee, ...values });
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
    birthDate: Yup.date().required('Required'),
    nationality: Yup.string().required('Required'),
    contactNumber: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    position: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
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
                Edit Employee
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
              <Field
                component={KeyboardDatePicker}
                name='birthDate'
                label='Date of Birth'
                format='P'
              />
              <Field
                component={TextField}
                required
                name='nationality'
                label='Nationality'
              />
              <Field
                component={TextField}
                required
                name='contactNumber'
                label='Contact Number'
              />
              <Field
                component={TextField}
                required
                name='address'
                label='Address'
              />
              <Field
                component={TextField}
                required
                name='position'
                label='Position'
              />
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
                Save
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditEmployeeModal;
