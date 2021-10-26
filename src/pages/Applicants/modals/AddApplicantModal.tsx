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
import { IApplicant } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { useSnackbar } from 'notistack';
import { postApplicant } from 'services';

interface AddApplicantModalProps extends DialogProps {
    onClose: () => void;
    onAdd: (applicant: IApplicant) => void;
}

export const AddApplicantModal: FC<AddApplicantModalProps> = ({
    onClose,
    onAdd,
    ...rest
}) => {
    const showError = useErrorMessageRenderer();

    const handleSubmit = async (values: any, submitProps: any) => {
        try {
            const reqBody = {
                ...values,
                gender: '',
                dateOfBirth: '',
                contactNumber: {
                    mobileNumber: [''],
                    landLineNumber: [''],
                    emailAddress: ['']
                },
                address: {
                    homeNumOrLotNum: '',
                    streetName: '',
                    districtOrTown: '',
                    zipCode: '',
                    province: '',
                    country: ''
                },
                nationality: '',
                language: [''],
                skills: [''],
                achievements: [''],
                careerHighlights : [''],
                careerBackground : [
                    {
                        company: '',
                        companyAddress:'',
                        position: '',
                        yearStarted: '',
                        yearEnded: ''
                    }
                ],
                educationalBackground: [
                    {
                        school: '',
                        schoolAddress: '',
                        course: '',
                        academicAward: '',
                        yearStarted: '',
                        yearEnded: ''
                    }
                ],
                characterReferences: [
                    {
                        name: '',
                        company: '',
                        occupation: '',
                        contact: {
                            mobile: '',
                            email: ''
                        }
                    }
                ],
                applicationStatus: '',
                interviewSchedule: '',
                applicationResult: '',
                applicationRemarks: '',
                fileAttachments: []
            };
            const result = await postApplicant(reqBody);
            const data  = {
                name: values.name,
                desiredPosition: values.desiredPosition,
                applicantNumber: result.data.data.applicantNumber,
                interviewSchedule: '',
                applicationResult: '',
            } as IApplicant;
            onAdd(data);
          }
          catch (err) {
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
        desiredPosition: Yup.string().required('Required'),
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
                desiredPosition: '',
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
                        Add Applicant
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
                        name='desiredPosition'
                        label='Desired Position'
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
    )

}