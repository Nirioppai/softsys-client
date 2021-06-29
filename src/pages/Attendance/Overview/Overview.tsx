import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Box } from '@material-ui/core';
import { AdminWrapper } from 'components';
import TableData from './TableData';
const AttendanceOverview: FC = () => {
  return (
    <>
      <AdminWrapper>
        <Helmet title='Attendance Overview' />
        <Typography variant='h1' gutterBottom>
          Attendance Overview
        </Typography>
        <Box>
          <TableData />
        </Box>
      </AdminWrapper>
    </>
  );
};

export default AttendanceOverview;
