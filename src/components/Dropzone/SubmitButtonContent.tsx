import { FC } from 'react';
import { Button } from '@material-ui/core';

const SubmitButtonContent: FC = () => {
  return (
    <Button
      component='div'
      variant='contained'
      color='primary'
      className='dzu-submitButton-internal'
    >
      Submit
    </Button>
  );
};

export default SubmitButtonContent;
