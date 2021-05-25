import React, { FC, useState, useEffect } from 'react';
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
import { getEmployees } from '../../services';
import { EmployeeTypes } from '../../types';
import { formatName } from '../../utils';

const Employees: FC = () => {
  const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <MainLayout>
      <Helmet title='Employees' />
      <Typography variant='h1' gutterBottom>
        Employees
      </Typography>
      {isLoaded ? (
        <>
          <TableContainer component={Paper} style={{ marginBottom: '1.5rem' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell aria-label='actions' />
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

export default Employees;
