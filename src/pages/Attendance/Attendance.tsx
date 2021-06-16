import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from '../../components';

const Attendance: FC = () => {
  return (
    <AdminWrapper>
      <Helmet title='Attendance' />
      <Typography variant='h1' gutterBottom>
        Attendance
      </Typography>
      <Typography>Under construction</Typography>
    </AdminWrapper>
  );
};

export default Attendance;
