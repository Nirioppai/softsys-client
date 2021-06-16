import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from '../../components';

const Requests: FC = () => {
  return (
    <AdminWrapper>
      <Helmet title='Requests' />
      <Typography variant='h1' gutterBottom>
        Requests
      </Typography>
      <Typography>Under construction</Typography>
    </AdminWrapper>
  );
};

export default Requests;
