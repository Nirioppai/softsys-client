import React from 'react';
import { Typography } from '@material-ui/core';
import { MainLayout } from '../../components';

const Home = () => {
  return (
    <MainLayout>
      <Typography variant='h1' gutterBottom>
        Hello, FIRST NAME
      </Typography>
      <Typography>Under construction</Typography>
    </MainLayout>
  );
};

export default Home;
