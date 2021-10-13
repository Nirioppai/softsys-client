import { useSnackbar } from 'notistack';

export const useErrorMessageRenderer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const renderErrorMessage = (err: any, customMessage?: string) => {
    const errorMsg =
      customMessage || err?.response?.data?.message || 'Something went wrong';

    console.error('Message:', errorMsg, '\n', err);
    enqueueSnackbar(errorMsg, { variant: 'error' });
  };

  return renderErrorMessage;
};
