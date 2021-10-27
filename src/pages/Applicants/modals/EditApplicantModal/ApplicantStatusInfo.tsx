import { FC } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import * as Yup from 'yup';
import { IApplicant } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { 
    putApplicant 
} from 'services';
// put other apis??

interface ApplicantStatusInfoProps {
    setNavigable: (navigable: boolean) => void;
    onSave: (applicant: IApplicant) => void;
    applicant?: any;
}

export const ApplicantStatusInfo: FC<ApplicantStatusInfoProps> = ({
    setNavigable,
    onSave,
    applicant,
    ...rest
}) => {
    const showError = useErrorMessageRenderer();

    const { _id, __v, createdAt, updatedAt, ...initialValues } = applicant;

    const handleSubmit = async (value: any) => {
        try {
            setNavigable(false);

            await putApplicant(_id, { ...value});
            onSave(value);
        }
        catch (err) {
            showError(err);
        }
        finally {
            setNavigable(true);
        }
    };

    const validationSchema = Yup.object().shape({
        applicantStatus: Yup.string().required('Required'),
        interviewSchedule: Yup.string(),
        applicationResult: Yup.string().required('Required'),
        applicationRemarks: Yup.string(),
        fileAttachments: Yup.array().of(Yup.string())
       
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ touched, errors, isSubmitting, values }) => (
                <Form>
                    <Typography
                        variant='h4'
                        component='h3'
                        style={{ marginBottom: '1rem' }}
                    >
                        Application Status
                    </Typography>
                    <Field
                        component={TextField}
                        autoFocus
                        required
                        name='applicationStatus'
                        label='Application Status'
                        style={{ marginBottom: '1rem' }}
                    />
                    <Typography
                        variant='h4'
                        component='h3'
                        style={{ marginBottom: '1rem' }}
                    >
                        Interview Date
                    </Typography>
                    <Field
                        component={TextField}
                        type='date'
                        name='interviewSchedule'
                        style={{ marginBottom: '1rem' }}
                    />
                    <Typography
                        variant='h4'
                        component='h3'
                        style={{ marginBottom: '1rem' }}
                    >
                        Application Result
                    </Typography>
                    <Field
                        component={TextField}
                        required
                        name='applicationResult'
                        label='Application Result'
                        style={{ marginBottom: '1rem' }}
                    />
                    <Typography
                        variant='h4'
                        component='h3'
                        style={{ marginBottom: '1rem' }}
                    >
                        Application Remarks
                    </Typography>
                    <Field
                        component={TextField}
                        as='textarea'
                        name='applicationRemarks'
                        label='Application Remarks'
                        style={{ marginBottom: '1rem' }}
                    />
                    
                    <Box display='flex' justifyContent='flex-end'>
                        <Button type='submit' variant='contained'>
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}