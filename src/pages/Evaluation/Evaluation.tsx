import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Button, IconButton } from '@material-ui/core';
import {
  AdminWrapper,
  PageLoader,
  Table,
  ErrorInfo,
  DeleteDialog,
} from 'components';
import { getEvaluation, deleteEvaluation } from 'services';
import { IEvaluation } from 'types';
import {
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Delete as DeleteIcon,
} from 'mdi-material-ui';
import { useErrorMessageRenderer} from 'utils';
import { AddEvaluationModal, EditEvaluationModal } from './modals';
import { useSnackbar } from 'notistack';


const Evaluation: FC = () => {
  // Hooks
  const showError = useErrorMessageRenderer();
  const { enqueueSnackbar } = useSnackbar();

  // Data
  const [evaluation, setEvaluation] = useState<IEvaluation[]>([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState<IEvaluation | null>(
    null
  );

  // Page statuses
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  //modals go here
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (evaluation: IEvaluation) => {
    setSelectedEvaluation(evaluation);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (evaluation: IEvaluation) => {
    setSelectedEvaluation(evaluation);
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
      accessor: 'evaluationName',
    },
    {
      Header: 'No. of Items',
      accessor: 'evaluationItems.length',
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

  //handles go here
  const handleAddEvaluation = (newEvaluation: IEvaluation) => {
    setEvaluation(
      [...evaluation, newEvaluation].sort((a, b) =>
        a['evaluationName'].localeCompare(b['evaluationName'], 'en', {sensitivity: 'base', })
      )
    );
    enqueueSnackbar('Evaluation added', { variant: 'success' });
    closeAddModal();
  };

  const handleUpdateEvaluation = (updatedEvaluation: IEvaluation) => {
    const newArray = evaluation
      .map((evaluation) =>
        evaluation._id === updatedEvaluation._id ? updatedEvaluation : evaluation
      ).sort((a: any, b: any) =>
        a['evaluationName'].localeCompare(b['evaluationName'], 'en', {sensitivity: 'base', })
      ) 
    setEvaluation(newArray);
    enqueueSnackbar('Evaluation updated', { variant: 'success' });
    closeEditModal();
  };

  const handleDeleteEvaluation = async () => {
    try {
      if (selectedEvaluation) {
        await deleteEvaluation(selectedEvaluation._id);

        setEvaluation(
          evaluation.filter((evaluation) => evaluation._id !== selectedEvaluation._id)
        );
        enqueueSnackbar('Evaluation deleted', { variant: 'success' });
        closeDeleteModal();
      }
    } catch (err) {
      showError(err);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getEvaluation();
        setEvaluation(
          data.data.sort((a: any, b: any) =>
            a['evaluationName'].localeCompare(b['evaluationName'], 'en', {sensitivity: 'base', })
          ) 
        );
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
        <Helmet title='Evaluations' />
        <Typography variant='h1' gutterBottom>
          Evaluation
        </Typography>
        <ErrorInfo />
      </AdminWrapper>
    );
  }
  
  return (
    <AdminWrapper>
      <Helmet title='Evaluations' />
      <Typography variant='h1' gutterBottom>
        Evaluation
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
          <Table columns={columns} data={evaluation} actionButtonCount={2} />
          <AddEvaluationModal
            open={addModalOpen}
            onClose={closeAddModal}
            onAdd={handleAddEvaluation}
          />
          {selectedEvaluation && (
            <>
              <EditEvaluationModal
                open={editModalOpen}
                onClose={closeEditModal}
                onSave={handleUpdateEvaluation}
                evaluation={selectedEvaluation}
              />
              <DeleteDialog
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDeleteEvaluation}
                title='Delete Evaluation'
                itemName={(selectedEvaluation != null) ? selectedEvaluation.evaluationName : 'error' }
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

export default Evaluation;
