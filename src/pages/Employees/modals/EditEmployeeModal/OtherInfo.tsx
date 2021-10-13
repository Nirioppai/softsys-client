import { FC, useState, useEffect } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import * as Yup from 'yup';
import { IEmployee, IEmployeeInformation } from 'types';
import { useErrorMessageRenderer } from 'utils';
import {
  getEmployeeInformation,
  postEmployeeInformation,
  putEmployeeInformation,
} from 'services';
import { useSnackbar } from 'notistack';
import { PageLoader, ErrorInfo } from 'components';

interface OtherInfoProps {
  setNavigable: (navigable: boolean) => void;
  onSave: (employee: IEmployee) => void;
  employee: IEmployee;
}

const OtherInfo: FC<OtherInfoProps> = ({
  setNavigable,
  onSave,
  employee,
  ...rest
}) => {
  const showError = useErrorMessageRenderer();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    employee: employee._id,
    employment: {
      classification: '',
      tenureShip: '',
    },
    employmentHistory: {
      employmentStart: '',
      employmentEnd: '',
      contractStart: '',
      contractEnd: '',
      probationStart: '',
      probationEnd: '',
      regularizationStart: '',
      regularizationEnd: '',
    },
    department: {
      departmentId: '',
      unit: '',
      departmentName: '',
      office: '',
    },
    governmentIssuedNumbers: {
      sss: '',
      gsis: '',
      tin: '',
      philhealth: '',
      pagibig: '',
      universalId: '',
      dln: '',
      prc: '',
    },
    immediateSuperior: '',
    civilStatus: '',
    emailAddresses: {
      email1: '',
      email2: '',
    },
    religion: '',
  };

  const [employeeInfoId, setEmployeeInfoId] = useState<string | null>(null);
  const [employeeInformation, setEmployeeInformation] =
    useState<IEmployeeInformation>({ ...initialValues });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setNavigable(false);

      if (employeeInfoId) {
        await putEmployeeInformation(employeeInfoId, values);
      } else {
        await postEmployeeInformation(values);
      }

      enqueueSnackbar('Employee updated', { variant: 'success' });
    } catch (err) {
      showError(err);
    } finally {
      setNavigable(true);
    }
  };

  const validationSchema = Yup.object().shape({
    employment: Yup.object().shape({
      classification: Yup.string().required('Required'),
      tenureShip: Yup.string().required('Required'),
    }),
    employmentHistory: Yup.object().shape({
      employmentStart: Yup.date().required('Required'),
      employmentEnd: Yup.date().required('Required'),
      contractStart: Yup.date().required('Required'),
      contractEnd: Yup.date().required('Required'),
      probationStart: Yup.date().required('Required'),
      probationEnd: Yup.date().required('Required'),
      regularizationStart: Yup.date().required('Required'),
      regularizationEnd: Yup.date().required('Required'),
    }),
    department: Yup.object().shape({
      departmentId: Yup.string().required('Required'),
      unit: Yup.string().required('Required'),
      departmentName: Yup.string().required('Required'),
      office: Yup.string().required('Required'),
    }),
    governmentIssuedNumbers: Yup.object().shape({
      sss: Yup.string().required('Required'),
      gsis: Yup.string().required('Required'),
      tin: Yup.string().required('Required'),
      philhealth: Yup.string().required('Required'),
      pagibig: Yup.string().required('Required'),
      universalId: Yup.string().required('Required'),
      dln: Yup.string().required('Required'),
      prc: Yup.string().required('Required'),
    }),
    immediateSuperior: Yup.string().required('Required'),
    civilStatus: Yup.string().required('Required'),
    emailAddresses: Yup.object().shape({
      email1: Yup.string().required('Required'),
      email2: Yup.string().required('Required'),
    }),
    religion: Yup.string().required('Required'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getEmployeeInformation(employee._id);

        if (data.data) {
          const { _id, createdAt, updatedAt, ...rest } = data.data;
          setEmployeeInfoId(_id);
          setEmployeeInformation(rest);
        }
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [employee]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (hasError) {
    return <ErrorInfo />;
  }

  return (
    <Formik
      initialValues={employeeInformation}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          {/* Employment */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Employment
          </Typography>
          <Field
            component={TextField}
            autoFocus
            required
            name='employment.classification'
            label='Classification'
          />
          <Field
            component={TextField}
            autoFocus
            required
            name='employment.tenureShip'
            label='Tenureship'
          />
          {/* Employment History */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Employment History
          </Typography>
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.employmentStart'
            label='Employment Start'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.employmentEnd'
            label='Employment End'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.contractStart'
            label='Contract Start'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.contractEnd'
            label='Contract End'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.probationStart'
            label='Probation Start'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.probationEnd'
            label='Probation End'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.regularizationStart'
            label='Regularization Start'
            format='P'
          />
          <Field
            component={KeyboardDatePicker}
            required
            name='employmentHistory.regularizationEnd'
            label='Regularization End'
            format='P'
          />
          {/* Department */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Department
          </Typography>
          <Field
            component={TextField}
            required
            name='department.departmentId'
            label='Department ID'
          />
          <Field
            component={TextField}
            required
            name='department.unit'
            label='Unit'
          />
          <Field
            component={TextField}
            required
            name='department.departmentName'
            label='Department Name'
          />
          <Field
            component={TextField}
            required
            name='department.office'
            label='Office'
          />
          {/* Government-issued Numbers */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Government-issued Numbers
          </Typography>
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.sss'
            label='SSS'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.gsis'
            label='GSIIS'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.tin'
            label='TIN'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.philhealth'
            label='PhilHealth'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.pagibig'
            label='pag-IBIG'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.universalId'
            label='Universal ID'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.sss'
            label='SSS'
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.dln'
            label="Driver's License Number"
          />
          <Field
            component={TextField}
            required
            name='governmentIssuedNumbers.prc'
            label='PRC'
          />
          {/* Miscellaneous */}
          <Typography
            variant='h4'
            component='h3'
            style={{ marginBottom: '1rem' }}
          >
            Miscellaneous
          </Typography>
          <Field
            component={TextField}
            required
            name='immediateSuperior'
            label='Immediate Supervisor'
          />
          <Field
            component={TextField}
            required
            name='civilStatus'
            label='Civil Status'
          />
          <Field
            component={TextField}
            required
            name='emailAddresses.email1'
            label='Email 1'
          />
          <Field
            component={TextField}
            required
            name='emailAddresses.email2'
            label='Email 2'
          />
          <Field
            component={TextField}
            required
            name='religion'
            label='Religion'
          />
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

export default OtherInfo;
