import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from '../../components';

const OrganizationalChart: FC = () => {
  return (
    <AdminWrapper>
      <Helmet title='Organizational Chart' />
      <Typography variant='h1' gutterBottom>
        Organizational Chart
      </Typography>
      <Typography>Under construction</Typography>
    </AdminWrapper>
  );
};

export default OrganizationalChart;
