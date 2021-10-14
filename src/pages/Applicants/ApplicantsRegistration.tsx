import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Button,
    CircularProgress,
    Typography,
    Grid 
  } from '@material-ui/core';
  import { Formik, Form, Field } from 'formik';
  import { TextField, CheckboxWithLabel } from 'formik-material-ui';
  import * as Yup from 'yup';
  import { useErrorMessageRenderer } from 'utils';
  import { postApplicant } from 'services';


const ApplicantsRegistration: FC = () => {
  
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
  
        const { data } = await postApplicant(reqBody);

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

    });
  

  return (
    <>
      <Helmet title='Applicants Registration' />
      <Formik
      initialValues={{
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
        },
        gender: '',
        dateOfBirth: '',
        contactNumber: {
            mobileNumber: [],
            landLineNumber: [],
            emailAddress: []
        },
        address : {
            homeNumOrLotNum: '',
            streetName: '',
            districtOrTown: '',
            zipCode: '',
            province: '',
            country: ''
        },
        nationality: '',
        language: [],
        skills: [],
        achievements: [],
        careerHighlights : [],
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
        desiredPosition: '',
        interviewSchedule: '',
        applicationResult: '',
        applicationRemarks: '',
        fileAttachments: []
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ touched, errors, isSubmitting, resetForm }) => (
        
          <Form>

              <Typography variant='h2' component='h2'>
                Application Form
              </Typography>

              <Field
                component={TextField}
                required
                name='desiredPosition'
                label='Desired Position'
              />

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
                name='gender'
                label='Gender'
              />
              <Field
                component={TextField}
                required
                type='date'
                name='dateOfBirth'
                label='Date of Birth'
              />
              
              <h3>Contact Information</h3>
              <Field
                component={TextField}
                required
                name='contactNumber.mobileNumber'
                label='Mobile Number'
              />
              <Field
                component={TextField}
                name='contactNumber.landLineNumber'
                label='Landline Number'
              />
              <Field
                component={TextField}
                required
                name='contactNumber.emailAddress'
                label='Email Address'
              />
              <h3>Address</h3>
              <Grid container>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.homeNumOrLotNum'
                    label='Home Number/Lot Number'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.streetName'
                    label='Street'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.districtOrTown'
                    label='District/Town'
                  />
                </Grid>
              </Grid>
              <Grid container>
              <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.zipCode'
                    label='Zip Code'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.province'
                    label='Province'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='address.country'
                    label='Country'
                  />
                </Grid>
              </Grid>

              <Field
                component={TextField}
                required
                name='nationality'
                label='Nationality'
              />
              <Field
                component={TextField}
                required
                name='language'
                label='Language'
              />
              <Field
                component={TextField}
                required
                name='skills'
                label='Skills'
              />
              <Field
                component={TextField}
                required
                name='achievements'
                label='Achievements'
              />
              <Field
                component={TextField}
                required
                name='careerHighlights'
                label='Career Highlights'
              />
              <h3>Career Background</h3>
              <Grid container>
                <Grid item>
                  <Field
                      component={TextField}
                      required
                      name='careerBackground.company'
                      label='Company'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='careerBackground.companyAddress'
                    label='Company Adress'
                />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='careerBackground.position'
                    label='Position'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='careerBackground.yearStarted'
                    label='Year Started'
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    required
                    name='careerBackground.yearEnded'
                    label='Year Ended'
                  />
                </Grid>
              </Grid>  
              
              
              
              
              
              <h3>Educational Background</h3>
              <Field
                component={TextField}
                required
                name='educationalBackground.school'
                label='School'
              />
              <Field
                component={TextField}
                required
                name='educationalBackground.schoolAddress'
                label='School Address'
              />
              <Field
                component={TextField}
                required
                name='educationalBackground.course'
                label='Course'
              />
              <Field
                component={TextField}
                required
                name='educationalBackground.yearStarted'
                label='Year Started'
              />
              <Field
                component={TextField}
                required
                name='educationalBackground.yearEnded'
                label='Year Ended'
              />
              <h3>Character References</h3>
              <Field
                component={TextField}
                required
                name='characterReferences.name'
                label='Name'
              />
              <Field
                component={TextField}
                required
                name='characterReferences.company'
                label='Company'
              />
              <Field
                component={TextField}
                required
                name='characterReferences.occupation'
                label='Occupation'
              />
              <Field
                component={TextField}
                required
                name='characterReferences.contact.mobile'
                label='Mobile Number'
              />
              <Field
                component={TextField}
                required
                name='characterReferences.contact.email'
                label='Email Address'
              />
              
              <Field
                component={CheckboxWithLabel}
                required
                name='condition'
                Label={{label: 'I accept the Terms and Conditions'}}
              />

              <Button
                onClick={() => {
                  resetForm();
                }}
                disabled={isSubmitting}
              >
                Discard
              </Button>
              <Button 
                disabled={isSubmitting}
                variant='contained' 
                type='submit' 
                startIcon={isSubmitting ? <CircularProgress size="0.75rem"/> : undefined}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Button>

          </Form>

      )}
    </Formik>
    </>
  );
};

export default ApplicantsRegistration;
