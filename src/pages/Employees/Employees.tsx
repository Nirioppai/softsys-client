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
import { AdminWrapper, PageLoader } from 'components';
import { getEmployees } from 'services';
import { IEmployee } from 'types';
import { formatName, fullNameSorter } from 'utils';

const Employees: FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [hasError, setHasError] = useState(false);

  const addEmployee = (newEmployee: IEmployee) => {
    setEmployees([...employees, newEmployee].sort(fullNameSorter));
  };

  const updateEmployee = (updatedEmployee: IEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (deletedEmployee: IEmployee) => {
    setEmployees(
      employees.filter((employee) => employee._id !== deletedEmployee._id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
        // setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminWrapper>
      <Helmet title='Employees' />
      <Typography variant='h1' gutterBottom>
        Employees
      </Typography>
      {!isLoading ? (
        <Paper style={{ marginBottom: '1.5rem' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Position</TableCell>
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
        </Paper>
      ) : (
        <PageLoader />
      )}
    </AdminWrapper>
  );
};

export default Employees;
