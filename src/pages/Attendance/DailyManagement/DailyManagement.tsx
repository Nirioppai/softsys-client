import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';

const DailyManagement: FC = () => {
  return (
    <>
      <AdminWrapper>
        <Helmet title='Daily Management' />
        <Typography variant='h1' gutterBottom>
        Daily Management
        </Typography>
        <Typography>Under construction</Typography>
      </AdminWrapper>
    </>
  );
};

export default DailyManagement;
