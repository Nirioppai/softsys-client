import { FC, useState, useEffect } from 'react';
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

const Applicants: FC = () => {
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getApplicants()
      .then((res) => setApplicants(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);
  
  

  return (
    <AdminWrapper>
      <Helmet title='Applicants' />
      <Typography variant='h1' gutterBottom>
        Applicants
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
                {
                  applicants.length > 0 
                  ?
                  applicants.map((applicant) => (
                    <TableRow key={applicant.applicant[0]._id}>
                      <TableCell style={{ fontWeight: 500 }}>
                        {formatName(applicant.applicant[0].name)}
                      </TableCell>
                      <TableCell>{applicant.info[0].desiredPosition}</TableCell>
                      <TableCell>
                        {applicant.info[0].interviewSchedule}
                      </TableCell>
                      <TableCell>{applicant.info[0].applicationResult}</TableCell>
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
                  ))
                  :
                  <p>There are no applicants as of this moment</p>
                }
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
