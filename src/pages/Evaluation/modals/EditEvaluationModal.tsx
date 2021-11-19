import {
    FC,
    ReactElement,
    Ref,
    forwardRef,
    useState,
  } from 'react';
  import {
    Dialog,
    DialogProps,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Box,
    Paper,
    Button,
    Divider,
  } from '@material-ui/core';
  import { Formik, Form, Field, FieldArray  } from 'formik';
  import { TextField } from 'formik-material-ui';
  import * as Yup from 'yup';
  import { TransitionProps } from '@material-ui/core/transitions';
  import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
  import { ArrowLeft as ArrowLeftIcon } from 'mdi-material-ui';
  import { IEvaluation } from 'types';
  import { useErrorMessageRenderer } from 'utils';
  import { putEvaluation } from 'services';
  
  
  interface EditEvaluationModalProps extends DialogProps {
    onClose: () => void;
    onSave: (evaluation: IEvaluation) => void;
    evaluation: IEvaluation;
  }
  
  const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: ReactElement },
    ref: Ref<unknown>
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      dialogPaper: {
        backgroundColor: theme.palette.background.default,
      },
      appBar: {
        position: 'relative',
        marginBottom: theme.spacing(3),
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
    })
  );
  
  export const EditEvaluationModal: FC<EditEvaluationModalProps> = ({
    evaluation,
    onSave,
    onClose,
    ...rest
  }) => {
    const classes = useStyles();
    const [navigable, setNavigable] = useState<boolean>(true);

    const showError = useErrorMessageRenderer();

    const { _id, __v,...initialValues } = evaluation;

    const handleSubmit = async (values: any) => {
        try {
          setNavigable(false);
          
          const sortedItems = values.evaluationItems.sort((a: any, b: any) =>
            a['category'].localeCompare(b['category'], 'en', {sensitivity: 'base', })
          ) ;

          values.evaluationItems = sortedItems;

          for(let i = 0; i < values.evaluationItems.length; i++){
            delete values.evaluationItems[i]._id
          }

          const { data } = await putEvaluation(_id, values);
          onSave(data.data);
        } catch (err) {
          showError(err);
        } finally {
          setNavigable(true);
        }
    };

    const validationSchema = Yup.object().shape({
      evaluationItems: Yup.array().of(
        Yup.object().shape({
          category: Yup.string().required('Required'),  
          criteria: Yup.string().required('Required'),
          weightage: Yup.number().required('Required').typeError('you must specify a number')
      })).nullable()
    });
  
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
        >
        {({ touched, errors, isSubmitting, resetForm}) => (
          <Dialog
            {...rest}
            fullScreen
            onClose={() => {
              resetForm();
              onClose();
            }}
            TransitionComponent={Transition}
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick={!navigable}
            disableEscapeKeyDown={!navigable}
          >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
              color='inherit'
              edge='start'
              onClick={
                  onClose
                }
              aria-label='close'
              disabled={!navigable}
              >
              <ArrowLeftIcon />
              </IconButton>
              <Typography variant='h3' className={classes.title}>
                Edit Evaluation
              </Typography>
              </Toolbar>
              </AppBar>
              <Container maxWidth='lg' style={{ marginBottom: '2rem' }}>
              <Box component='header' marginBottom={1}>
                <Typography variant='h1'>{evaluation.evaluationName}</Typography>
              </Box>
              <Paper style={{ padding: '1rem' }}>
                <Form>
                  <FieldArray
                    name='evaluationItems'
                    render={arrayHelpers => {
                      return (
                        <Box>
                          <Field
                            component={TextField}
                            required
                            name={`evaluationName`}
                            label='Evaluation Name'
                          />
                          <Divider style={{ marginBottom: '1rem' }} />
                          
                          {arrayHelpers.form.values.evaluationItems.map((i: any, index: number) => (
                            <div key={index}>
                                <Field
                                  component={TextField}
                                  required
                                  name={`evaluationItems[${index}].category`}
                                  label='Category'
                                />
                                <Field
                                  component={TextField}
                                  required
                                  name={`evaluationItems[${index}].criteria`}
                                  label='Criteria'
                                />
                                <Field
                                  component={TextField}
                                  required
                                  name={`evaluationItems[${index}].weightage`}
                                  label='Weightage'
                                />
                              <Button 
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} 
                                style={{ 
                                  marginBottom: '1rem',
                                  borderColor: '#A90B0B ',
                                  color: '#A90B0B '
                                }}
                                fullWidth
                                variant='outlined'
                                color='primary'
                              >
                                Remove
                              </Button>
                              <Divider style={{ marginBottom: '1rem' }} />
                            </div>
                          ))}
                          <Button
                          type="button"
                          onClick={() => arrayHelpers.push({category: '', criteria: '', weightage: ''})}
                          style={{ 
                            marginBottom: '1rem',
                            borderColor: 'lightgreen',
                            color: 'green'
                          }}
                          fullWidth
                          variant='outlined' 
                          >
                            Add
                          </Button>
                          <Box display='flex' justifyContent='flex-end'>
                            <Button type='submit' variant='contained' disabled={isSubmitting}>
                              Save
                            </Button>
                          </Box>
                        </Box>
                          
                      )
                    }
                  }/>
                    </Form>   
                </Paper>
                </Container>
            </Dialog>
        )}
        </Formik>
    );
  };
  
  export default EditEvaluationModal;
  