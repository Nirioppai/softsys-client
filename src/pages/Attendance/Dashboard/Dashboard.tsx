import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';

const AttendanceDashboard: FC = () => {
  return (
    <>
      <AdminWrapper>
        <Helmet title='Attendance Dashboard' />
        <Typography variant='h1' gutterBottom>
          Attendance Dashboard
        </Typography>
        <Typography>Under construction</Typography>
      </AdminWrapper>
    </>
  );
};

export default AttendanceDashboard;
