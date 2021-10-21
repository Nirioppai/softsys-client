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
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values: any, submitProps: any) => {
        try {
            const reqBody = {
                ...values,
              applicationStatus: '',
              interviewSchedule: '',
              applicationResult: '',
              applicationRemarks: '',
              fileAttachments: []
            };
            await postApplicant(reqBody);
            enqueueSnackbar('Applicant Added', { variant: 'success' });
            submitProps.setSubmitting(false);
            submitProps.resetForm();
          }
          catch (err) {
              showError(err);
          }
    };

    return (
        <h1>TEST</h1>
    )

}