import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { MainLayout } from '../../components';

const NotFound: FC = () => {
  return (
    <MainLayout>
      <Helmet title='Page not found' />
      <Typography variant='h1'>Page not found</Typography>
    </MainLayout>
  );
};

export default NotFound;
