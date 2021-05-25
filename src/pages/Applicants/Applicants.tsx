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
  Box,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import {
  Information as InformationIcon,
  DotsVertical as DotsVerticalIcon,
} from 'mdi-material-ui';
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
        <>
          <TableContainer component={Paper} style={{ marginBottom: '1.5rem' }}>
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
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        style={{ marginRight: '0.25rem' }}
                      >
                        <InformationIcon fontSize='small' />
                      </IconButton>
                      <IconButton size='small' edge='end'>
                        <DotsVerticalIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display='flex' justifyContent='center'>
            <Pagination count={10} color='primary' />
          </Box>
        </>
      ) : (
        'Loading'
      )}
    </MainLayout>
  );
};

export default Applicants;
