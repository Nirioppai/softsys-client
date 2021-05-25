import React, { FC, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import { Information as InformationIcon } from 'mdi-material-ui';
import { MainLayout } from '../../components';
import { getApplicants } from '../../services';
import { ApplicantTypes } from './ApplicantTypes';
import { formatName } from '../../utils';

const Applicants: FC = () => {
  const [applicants, setApplicants] = useState<ApplicantTypes[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getApplicants()
      .then((res) => setApplicants(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <MainLayout>
      <Helmet title='Applicants' />
      <Typography variant='h1' gutterBottom>
        Applicants
      </Typography>
      {isLoaded ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Interview Date</TableCell>
                <TableCell>Result</TableCell>
                <TableCell aria-label='actions' />
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant._id}>
                  <TableCell>{formatName(applicant)}</TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell>
                    {format(
                      new Date(
                        applicant.interviewSchedule.year,
                        applicant.interviewSchedule.month,
                        applicant.interviewSchedule.day
                      ),
                      'P'
                    )}
                  </TableCell>
                  <TableCell>{applicant.applicationResult}</TableCell>
                  <TableCell>
                    <IconButton>
                      <InformationIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        'Loading'
      )}
    </MainLayout>
  );
};

export default Applicants;
