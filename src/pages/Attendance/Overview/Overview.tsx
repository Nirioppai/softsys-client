import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';

const AttendanceOverview: FC = () => {
  return (
    <>
      <AdminWrapper>
        <Helmet title='Attendance Overview' />
        <Typography variant='h1' gutterBottom>
        Attendance Overview
        </Typography>
        <Typography>Under construction</Typography>
      </AdminWrapper>
    </>
  );
};

export default AttendanceOverview;
