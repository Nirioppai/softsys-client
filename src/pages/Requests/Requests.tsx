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
  TablePagination,
} from '@material-ui/core';
import { Pencil as PencilIcon, Delete as DeleteIcon } from 'mdi-material-ui';
import { AdminWrapper } from 'components';
import { getRequests } from 'services';
import { EmployeeTypes } from 'types';
import { formatName } from 'utils';

const Requests: FC = () => {
  const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getRequests()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <AdminWrapper>
      <Helmet title='Requests' />
      <Typography variant='h1' gutterBottom>
        Requests
      </Typography>
      {isLoaded ? (
        <Paper style={{ marginBottom: '1.5rem' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Requester Name</TableCell>
                  <TableCell>Request Subject</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell
                    aria-label='actions'
                    style={{ width: '6rem', minWidth: '6rem' }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell style={{ fontWeight: 500 }}>
                      {formatName(employee)}
                    </TableCell>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        aria-label='edit employee'
                        style={{ marginRight: '0.25rem' }}
                      >
                        <PencilIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        edge='end'
                        aria-label='delete employee'
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
    </AdminWrapper>
  );
};

export default Requests;
