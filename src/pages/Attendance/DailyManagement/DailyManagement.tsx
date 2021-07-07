import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
import {data, columns } from './Data';
import Table from "./TableRender";

const DailyManagement: FC = () => {
  const [testData, setTestData] = useState(data);
  
  return (
    <>
      <AdminWrapper>
        <Helmet title='Daily Management' />
        <Typography variant='h1' gutterBottom>
        Daily Management
        </Typography>
        <Typography>Under construction</Typography>
        <Table columns={columns} data={testData} />
      </AdminWrapper>
    </>
  );
};

export default DailyManagement;
