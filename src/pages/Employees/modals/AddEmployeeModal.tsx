import { FC } from 'react';
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
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
      const reqBody = {
        ...values,
        name: {
          ...values.name,
          title: '',
        },
        contactNumber: {
          mobileNumber: [],
          landLineNumber: [],
        },
        homeAddress: {
          homeNumOrLotNum: '',
          streetName: '',
          districtOrTown: '',
          zipCode: '',
          province: '',
          country: '',
        },
        currentAddress: {
          homeNumOrLotNum: '',
          streetName: '',
          districtOrTown: '',
          zipCode: '',
          province: '',
          country: '',
        },
        permanentAddress: {
          homeNumOrLotNum: '',
          streetName: '',
          districtOrTown: '',
          zipCode: '',
          province: '',
          country: '',
        },
        role: '',
        permissions: [],
        nationality: '',
        dateOfBirth: '',
      };

      const { data } = await postEmployee(reqBody);
      onAdd(data.data);
    } catch (err) {
      showError(err);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      middleName: Yup.string(),
      lastName: Yup.string().required('Required'),
      suffix: Yup.string(),
    }),
    employeeId: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
        },
        employeeId: '',
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
                name='name.firstName'
                autoComplete='given-name'
                label='First Name'
              />
              <Field
                component={TextField}
                name='name.middleName'
                autoComplete='additional-name'
                label='Middle Name'
              />
              <Field
                component={TextField}
                required
                name='name.lastName'
                autoComplete='family-name'
                label='Last Name'
              />
              <Field
                component={TextField}
                name='name.suffix'
                autoComplete='honorific-suffix'
                label='Suffix'
              />
              <Field
                component={TextField}
                required
                name='employeeId'
                label='Employee ID'
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
