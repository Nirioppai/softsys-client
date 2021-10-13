import { FC } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const ErrorInfo: FC = () => {
  return (
    <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      An error has occurred. Please reload the page and try again.
    </Alert>
  );
};

export default ErrorInfo;
