import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Typography,
  Paper,
  IconButton,
  Button,
} from '@material-ui/core';
import { Plus as PlusIcon, Pencil as PencilIcon, Delete as DeleteIcon } from 'mdi-material-ui';
import { AdminWrapper, Table, PageLoader, ErrorInfo, DeleteDialog } from 'components';
import {
  formatName,
  nestedFullNameSorter,
  useErrorMessageRenderer,
} from 'utils';
import { getApplicants, deleteApplicant, putApplicant } from 'services';
import { IApplicant } from 'types';
import { useSnackbar } from 'notistack';
import { EditApplicantModal, AddApplicantModal, } from './modals';

const Applicants: FC = () => {
  // Data
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<IApplicant | null>(
    null
  );

  // Hooks
  const showError = useErrorMessageRenderer();
  const { enqueueSnackbar } = useSnackbar();
  
  // Page statuses
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (applicant: IApplicant) => {
    setSelectedApplicant(applicant);
    setEditModalOpen(true);
  }

  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (applicant: IApplicant) => {
    setSelectedApplicant(applicant);
    setDeleteModalOpen(true);
  }

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
      accessor: (originalRow: any) => formatName(originalRow.name),
    },
    {
      Header: 'Applicant Number',
      accessor: 'applicantNumber',
    },
    {
      Header: 'Position',
      accessor: 'desiredPosition',
    },
    {
      Header: 'Interview Date',
      accessor: 'interviewSchedule',
    },
    {
      Header: 'Result',
      accessor: 'applicantResult',
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

  const handleAddApplicant = (newApplicant: IApplicant) => {
    setApplicants(
      [...applicants, newApplicant].sort((a, b) => 
        nestedFullNameSorter(a, b, 'name')
      )
    );
    enqueueSnackbar('Applicant Added', {variant: 'success'});
    closeAddModal();
  };

  const handleUpdateApplicant = (updatedApplicant: IApplicant) => {
    const newArray = applicants
      .map((applicant) =>
        applicant._id === updatedApplicant._id ? updatedApplicant: applicant
      )
      .sort((a, b) => nestedFullNameSorter(a, b, 'name'));
    setApplicants(newArray);
    enqueueSnackbar('Applicant updated', {variant: 'success'});
    closeEditModal();
  };

  const handleDeleteApplicant = async () => {
    try {
      if (selectedApplicant) {
        await deleteApplicant(selectedApplicant._id);

        setApplicants(
          applicants.filter((applicant) => applicant._id !== selectedApplicant._id)
        );
        enqueueSnackbar('Applicant deleted', {variant: 'success'});
        closeDeleteModal();
      }
    }
    catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const applicantArray = []
      try {
        const { data } = await getApplicants();
        for(let i=0; i<data.data.length; i++) {
          applicantArray.push({...data.data[i], ...data.data[i].applicantNumber});
        }
        setApplicants(
          applicantArray.sort((a: IApplicant, b: IApplicant) => 
            nestedFullNameSorter(a, b, 'name')
          )
        );
      }
      catch (err) {
        console.error(err);
        setHasError(true)
      }
      finally {
        setIsLoaded(true)
      }  
    };

    fetchApplicants();
  }, []);
  
  if (hasError) {
    return (
      <AdminWrapper>
        <Helmet title='Applicants' />
        <Typography variant='h1' gutterBottom>
          Applicants
        </Typography>
        <ErrorInfo />
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <Helmet title='Applicants' />
      <Typography variant='h1' gutterBottom>
        Applicants
      </Typography>
      {isLoaded ? (
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
          <Paper style={{ marginBottom: '1.5rem' }}>
            <Table columns={columns} data={applicants} actionButtonCount={2}/>
            <AddApplicantModal
              open={addModalOpen}
              onClose={closeAddModal}
              onAdd={handleAddApplicant}
            />
            {selectedApplicant && (
              <>
                <EditApplicantModal 
                  open={editModalOpen}
                  onClose={closeEditModal}
                  onSave={handleUpdateApplicant}
                  applicant={selectedApplicant}
                />
                <DeleteDialog 
                  open={deleteModalOpen}
                  onClose={closeDeleteModal}
                  onDelete={handleDeleteApplicant}
                  title='Delete Applicant'
                  itemName={formatName(selectedApplicant.name)}
                />
              </>
            )}
          </Paper>
        </>  
      ) : (
        <PageLoader />
      )}
    </AdminWrapper>
  );
};

export default Applicants;
