import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { MainLayout } from '../../components';

const Requests: FC = () => {
  return (
    <MainLayout>
      <Helmet title='Requests' />
      <Typography variant='h1' gutterBottom>
        Requests
      </Typography>
      <Typography>Under construction</Typography>
    </MainLayout>
  );
};

export default Requests;
