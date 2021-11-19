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
import { IEvaluation } from 'types';
import { useErrorMessageRenderer } from 'utils';
import { postEvaluation } from 'services';

interface AddEvaluationModalProps extends DialogProps {
    onClose: () => void;
    onAdd: (evaluation: IEvaluation) => void;
  }

const AddEvaluationModal: FC<AddEvaluationModalProps> = ({
    onClose,
    onAdd,
    ...rest
  }) => {
    const showError = useErrorMessageRenderer();
  
    const handleSubmit = async (values: any) => {
      try {
        const reqBody = {
          ...values,
          evaluationItems: []
        };
        const { data } = await postEvaluation(reqBody);
        onAdd(data.data);
      } catch (err) {
        showError(err);
      }
    };
  
    const validationSchema = Yup.object().shape({
      evaluationName: Yup.string().required('Required') 
    });
  
    return (
      <Formik
        initialValues={{
          evaluationName: ''
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
                  Add Evaluation
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Field
                  component={TextField}
                  autoFocus
                  required
                  name='evaluationName'
                  autoComplete='Eval-name'
                  label='Evaluation Name'
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
  
  export default AddEvaluationModal;
  