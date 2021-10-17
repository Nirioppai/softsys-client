import { FC } from 'react';
import React from 'react';
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
  //for inputs that are arrays
  import { FieldArrayMaker, FieldArrayMakerObjects } from './utils/FieldArrayMaker';

  import { postApplicant } from 'services';


const ApplicantsRegistration: FC = () => {
  
    const showError = useErrorMessageRenderer();

    const handleSubmit = async (values: any) => {
      console.log(values)
      try {
        const reqBody = {
          ...values,
        applicationStatus: '',
        interviewSchedule: '',
        applicationResult: '',
        applicationRemarks: '',
        fileAttachments: []
      };
        const { data } = await postApplicant(reqBody);
        console.log(data)
      } catch (err) {
        console.log(err);
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
      contactNumber: Yup.object().shape({
          mobileNumber: Yup.array().of(Yup.string()).min(1).required('Required'),
          landLineNumber: Yup.array().of(Yup.string()).nullable(true),
          emailAddress: Yup.array().of(Yup.string()).min(1).required('Required'),
      }),
      address: Yup.object().shape({
        homeNumOrLotNum: Yup.string().required('Required'),
        streetName: Yup.string().required('Required'),
        districtOrTown: Yup.string().required('Required'),
        zipCode: Yup.string().required('Required'),
        province: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
      }),
      nationality: Yup.string().required('Required'),
      language: Yup.array().of(Yup.string()).min(1).required('Required'),
      skills: Yup.array().of(Yup.string()).min(1).required('Required'),
      achievements: Yup.array().of(Yup.string()),
      careerHighlights : Yup.array().of(Yup.string()),
      careerBackground : Yup.array().of(Yup.object().shape({
        company: Yup.string(),
        companyAddress: Yup.string(),
        position: Yup.string(),
        yearStarted: Yup.string(),
        yearEnded: Yup.string(),
      })),
      educationalBackground: Yup.array().of(Yup.object().shape({
        school: Yup.string().required('Required'),
        schoolAddress: Yup.string().required('Required'),
        course: Yup.string().required('Required'),
        academicAward: Yup.string(),
        yearStarted: Yup.string().required('Required'),
        yearEnded: Yup.string().required('Required'),
      })).min(1).required('Required'),
      characterReferences: Yup.array().of(Yup.object().shape({
        name: Yup.string(),
        company: Yup.string(),
        occupation: Yup.string(),
        contact: Yup.object().shape({
            mobile: Yup.string(),
            email: Yup.string().email('Must be a valid email'),
        }),
      })),
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
      {({ touched, values, errors, isSubmitting, resetForm, handleSubmit }) => (
        
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
              {FieldArrayMaker(values.contactNumber.mobileNumber, 'contactNumber.mobileNumber', 'Mobile Number', true)}
              {FieldArrayMaker(values.contactNumber.landLineNumber, 'contactNumber.landLineNumber', 'Landline Number', false)}
              {FieldArrayMaker(values.contactNumber.emailAddress, 'contactNumber.emailAddress', 'Email Address', true)}

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
              {/* language field array */}
              {FieldArrayMaker(values.language, 'language', 'Language', true)}
              {/* skills field array */}
              {FieldArrayMaker(values.skills, 'skills', 'Skills', true)}
              {/* achievements field array */}
              {FieldArrayMaker(values.achievements, 'achievements', 'Achievements', false)}
              {/* career highlights field array */}
              {FieldArrayMaker(values.careerHighlights, 'careerHighlights', 'Career Highlights', false)}

              <h3>Career Background</h3>
              {/* field array for array of objects */}
              {
                FieldArrayMakerObjects(
                  values.careerBackground, 
                  'careerBackground', 
                  'Company',
                  ['company', 'companyAddress', 'position', 'yearStarted', 'yearEnded'], 
                  ['Company Name', 'Company Address', 'Position', 'Year Started', 'Year Ended'], 
                  false
                )
              }
              
              <h3>Educational Background</h3>
              {
                FieldArrayMakerObjects(
                  values.educationalBackground, 
                  'educationalBackground', 
                  'School',
                  ['school', 'schoolAddress', 'course', 'academicAward', 'yearStarted', 'yearEnded'], 
                  ['School Name', 'School Address', 'Course', 'Academic Award', 'Year Started', 'Year Ended'], 
                  true
                )
              }

              <h3>Character References</h3>
              {
                FieldArrayMakerObjects(
                  values.characterReferences, 
                  'characterReferences', 
                  'Reference',
                  ['name', 'company', 'occupation', 'contact.mobile', 'contact.email'], 
                  ['Name', 'Company', 'Occupation', 'Mobile', 'Email'], 
                  false
                )
              }
              
              <Field
                component={CheckboxWithLabel}
                type='checkbox'
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
