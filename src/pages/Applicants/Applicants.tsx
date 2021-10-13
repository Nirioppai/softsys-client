import { FC, useState, useEffect } from 'react';
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
import { Pencil as PencilIcon, Delete as DeleteIcon } from 'mdi-material-ui';
import { AdminWrapper } from 'components';
import { getApplicants } from 'services';
import { IApplicant } from 'types';
import { formatName } from 'utils';
import AddApplicant from 'components/AddModals/AddApplicant';

const Applicants: FC = () => {
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getApplicants()
      .then((res) => setApplicants(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <AdminWrapper>
      <Helmet title='Applicants' />
      <Typography variant='h1' gutterBottom style={{display:"flex", justifyContent:"space-between"}}>
        Applicants
        <AddApplicant />
      </Typography>
      {isLoaded ? (
        <Paper style={{ marginBottom: '1.5rem' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Interview Date</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell
                    aria-label='actions'
                    style={{ width: '6rem', minWidth: '6rem' }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant._id}>
                    <TableCell style={{ fontWeight: 500 }}>
                      {formatName(applicant)}
                    </TableCell>
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
                        aria-label='edit applicant'
                        style={{ marginRight: '0.25rem' }}
                      >
                        <PencilIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        edge='end'
                        aria-label='delete applicant'
                      >
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        'Loading'
      )}
    </AdminWrapper>
  );
};

export default Applicants;
