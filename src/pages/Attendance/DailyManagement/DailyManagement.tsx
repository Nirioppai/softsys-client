import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
import {data, columns } from './Data';
import Table from "./TableRender";
import {DMContext} from './Context';

const DailyManagement: FC = () => {
  const [testData, setTestData] = useState(data);
  const [selectedData, setSelectedData] = useState([]);
  
  return (
    <>
      <DMContext.Provider value={{testData, setTestData, selectedData, setSelectedData}}>
        <AdminWrapper>
          <Helmet title='Daily Management' />
          <Typography variant='h1' gutterBottom>
          Daily Management
          </Typography>
          <Table columns={columns} data={testData} />
        </AdminWrapper>
      </DMContext.Provider>
    </>
  );
};

export default DailyManagement;
