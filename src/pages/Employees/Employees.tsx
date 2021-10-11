import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Button, IconButton } from '@material-ui/core';
import {
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Delete as DeleteIcon,
} from 'mdi-material-ui';
import {
  AdminWrapper,
  PageLoader,
  Table,
  ErrorInfo,
  DeleteDialog,
} from 'components';
import { getEmployees, deleteEmployee } from 'services';
import { IEmployee } from 'types';
import { formatName, fullNameSorter, useErrorMessageRenderer } from 'utils';
import { AddEmployeeModal, EditEmployeeModal } from './modals';
import { useSnackbar } from 'notistack';

const Employees: FC = () => {
  // Hooks
  const showError = useErrorMessageRenderer();
  const { enqueueSnackbar } = useSnackbar();

  // Data
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );

  // Page status
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const columns = [
    {
      Header: 'No.',
      id: 'row',
      filterable: false,
      accessor: (row: any, index: number) => index + 1,
      cellStyle: {
        width: 100,
      },
    },
    {
      Header: 'Name',
      id: 'name',
      accessor: (originalRow: any) => formatName(originalRow),
    },
    {
      Header: 'Employee ID',
      accessor: 'employeeId',
    },
    {
      Header: 'Position',
      accessor: 'position',
    },
    {
      ariaLabel: 'actions',
      id: 'actions',
      Cell: ({ row }: any) => (
        <>
          <IconButton
            size='small'
            aria-label='edit employee'
            onClick={() => openEditModal(row.original)}
          >
            <PencilIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            edge='end'
            aria-label='delete employee'
            onClick={() => openDeleteModal(row.original)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </>
      ),
    },
  ];

  const handleAddEmployee = (newEmployee: IEmployee) => {
    setEmployees([...employees, newEmployee].sort(fullNameSorter));
    enqueueSnackbar('Employee added', { variant: 'success' });
    closeAddModal();
  };

  const handleUpdateEmployee = (updatedEmployee: IEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
    enqueueSnackbar('Employee updated', { variant: 'success' });
    closeEditModal();
  };

  const handleDeleteEmployee = async () => {
    try {
      if (selectedEmployee) {
        await deleteEmployee(selectedEmployee._id);

        setEmployees(
          employees.filter((employee) => employee._id !== selectedEmployee._id)
        );
        enqueueSnackbar('Employee deleted', { variant: 'success' });
        closeDeleteModal();
      }
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (hasError) {
    return (
      <AdminWrapper>
        <Helmet title='Employees' />
        <Typography variant='h1' gutterBottom>
          Employees
        </Typography>
        <ErrorInfo />
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <Helmet title='Employees' />
      <Typography variant='h1' gutterBottom>
        Employees
      </Typography>
      {!isLoading ? (
        <>
          <Button
            color='primary'
            variant='contained'
            startIcon={<PlusIcon />}
            onClick={openAddModal}
            style={{ marginBottom: '1rem' }}
          >
            Add
          </Button>
          <Table columns={columns} data={employees} actionButtonCount={2} />
          <AddEmployeeModal
            open={addModalOpen}
            onClose={closeAddModal}
            onAdd={handleAddEmployee}
          />
          {selectedEmployee && (
            <>
              <EditEmployeeModal
                open={editModalOpen}
                onClose={closeEditModal}
                onSave={handleUpdateEmployee}
                employee={selectedEmployee}
              />
              <DeleteDialog
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDeleteEmployee}
                title='Delete Employee'
                itemName={formatName(selectedEmployee)}
              />
            </>
          )}
        </>
      ) : (
        <PageLoader />
      )}
    </AdminWrapper>
  );
};

export default Employees;
