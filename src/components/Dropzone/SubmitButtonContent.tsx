import { FC } from 'react';
import { Button } from '@material-ui/core';

const SubmitButtonContent: FC = () => {
  return (
    <Button component='div' variant='contained' className='dzu-submitButton'>
      Submit
    </Button>
  );
};

export default SubmitButtonContent;
