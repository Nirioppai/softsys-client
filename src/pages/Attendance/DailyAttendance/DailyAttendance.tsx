import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
const DailyAttendance: FC = () => {
  return (
    <>
      <AdminWrapper>
        <Helmet title='Daily Attendance' />
        <Typography variant='h1' gutterBottom>
          Daily Attendance
        </Typography>
        <Typography>Under construction</Typography>
      </AdminWrapper>
    </>
  );
};

export default DailyAttendance;