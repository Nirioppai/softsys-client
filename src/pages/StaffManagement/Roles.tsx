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
  TablePagination,
} from '@material-ui/core';
import { Pencil as PencilIcon, Delete as DeleteIcon } from 'mdi-material-ui';
import { AdminWrapper } from 'components';
import { getRoles } from 'services';
import { ApplicantTypes } from 'types';
import { formatName } from 'utils';

const Roles: FC = () => {
  const [applicants, setApplicants] = useState<ApplicantTypes[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getRoles()
      .then((res) => setApplicants(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      {isLoaded ? (
        <Paper style={{ marginBottom: '1.5rem' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>

                  <TableCell
                    aria-label='actions'
                    style={{ width: '6rem', minWidth: '6rem' }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant._id}>
                    <TableCell>{applicant.position}</TableCell>

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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={10}
            rowsPerPage={10}
            page={10}
            onChangePage={() => {}}
            onChangeRowsPerPage={() => {}}
          />
        </Paper>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Roles;
