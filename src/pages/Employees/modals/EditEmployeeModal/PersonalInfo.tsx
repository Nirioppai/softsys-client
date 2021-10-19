import { FC } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import * as Yup from 'yup';
import { IEmployee } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { putEmployee } from 'services';

interface PersonalInfoProps {
  setNavigable: (navigable: boolean) => void;
  onSave: (employee: IEmployee) => void;
  employee: IEmployee;
}

const PersonalInfo: FC<PersonalInfoProps> = ({
  setNavigable,
  onSave,
  employee,
  ...rest
}) => {
  const showError = useErrorMessageRenderer();

  const { _id, __v, createdAt, updatedAt, ...initialValues } = employee;

  const handleSubmit = async (values: any) => {
    try {
      setNavigable(false);

      const { data } = await putEmployee(_id, { ...values, type: 'employee' });
      onSave(data.data);
    } catch (err) {
      showError(err);
    } finally {
      setNavigable(true);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      middleName: Yup.string(),
      lastName: Yup.string().required('Required'),
      suffix: Yup.string(),
    }),
    gender: Yup.string().required('Required'),
    dateOfBirth: Yup.string().required('Required'),
    nationality: Yup.string().required('Required'),
    contactNumber: Yup.object().shape({
      mobileNumber: Yup.array().of(Yup.string()),
      landLineNumber: Yup.array().of(Yup.string()),
    }),
    homeAddress: Yup.object().shape({
      homeNumOrLotNum: Yup.string(),
      streetName: Yup.string(),
      districtOrTown: Yup.string(),
      zipCode: Yup.string(),
      province: Yup.string(),
      country: Yup.string(),
    }),
    permanentAddress: Yup.object().shape({
      homeNumOrLotNum: Yup.string(),
      streetName: Yup.string(),
      districtOrTown: Yup.string(),
      zipCode: Yup.string(),
      province: Yup.string(),
      country: Yup.string(),
    }),
    currentAddress: Yup.object().shape({
      homeNumOrLotNum: Yup.string(),
      streetName: Yup.string(),
      districtOrTown: Yup.string(),
      zipCode: Yup.string(),
      province: Yup.string(),
      country: Yup.string(),
    }),
    employeeId: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    permissions: Yup.array(),
    type: Yup.string(),
    isActive: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          {/* Basic information */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Basic Information
          </Typography>
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
          <Field component={TextField} required name='gender' label='Gender' />
          <Field
            component={KeyboardDatePicker}
            name='dateOfBirth'
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
            name='contactNumber.mobileNumber[0]'
            label='Mobile Number'
          />
          <Field
            component={TextField}
            name='contactNumber.landLineNumber[0]'
            label='Landline'
          />
          {/* Home address */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Home Address
          </Typography>
          <Field
            component={TextField}
            name='homeAddress.homeNumOrLotNum'
            label='House Number'
          />
          <Field
            component={TextField}
            name='homeAddress.streetName'
            label='Street Address'
          />
          <Field
            component={TextField}
            name='homeAddress.districtOrTown'
            label='Town / District'
          />
          <Field
            component={TextField}
            name='homeAddress.zipCode'
            label='Zip / Postal Code'
          />
          <Field
            component={TextField}
            name='homeAddress.province'
            label='State / Province'
          />
          <Field
            component={TextField}
            name='homeAddress.country'
            label='Country'
          />
          {/* Permanent Address */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Permanent Address
          </Typography>
          <Field
            component={TextField}
            name='permanentAddress.homeNumOrLotNum'
            label='House Number'
          />
          <Field
            component={TextField}
            name='permanentAddress.streetName'
            label='Street Address'
          />
          <Field
            component={TextField}
            name='permanentAddress.districtOrTown'
            label='Town / District'
          />
          <Field
            component={TextField}
            name='permanentAddress.zipCode'
            label='Zip / Postal Code'
          />
          <Field
            component={TextField}
            name='permanentAddress.province'
            label='State / Province'
          />
          <Field
            component={TextField}
            name='permanentAddress.country'
            label='Country'
          />
          {/* Current Address */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Current Address
          </Typography>
          <Field
            component={TextField}
            name='currentAddress.homeNumOrLotNum'
            label='House Number'
          />
          <Field
            component={TextField}
            name='currentAddress.streetName'
            label='Street Address'
          />
          <Field
            component={TextField}
            name='currentAddress.districtOrTown'
            label='Town / District'
          />
          <Field
            component={TextField}
            name='currentAddress.zipCode'
            label='Zip / Postal Code'
          />
          <Field
            component={TextField}
            name='currentAddress.province'
            label='State / Province'
          />
          <Field
            component={TextField}
            name='currentAddress.country'
            label='Country'
          />
          {/* Employee information */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Employee Information
          </Typography>
          <Field
            component={TextField}
            required
            name='employeeId'
            label='Employee ID'
          />
          <Field component={TextField} required name='role' label='Role' />
          <Box display='flex' justifyContent='flex-end'>
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfo;
