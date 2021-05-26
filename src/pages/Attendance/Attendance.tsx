import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { MainLayout } from '../../components';

const Attendance: FC = () => {
  return (
    <MainLayout>
      <Helmet title='Attendance' />
      <Typography variant='h1' gutterBottom>
        Attendance
      </Typography>
      <Typography>Under construction</Typography>
    </MainLayout>
  );
};

export default Attendance;
