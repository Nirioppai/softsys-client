import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';

const NotFound: FC = () => {
  return (
    <>
      <Helmet title='Page not found' />
      <Typography variant='h1'>Page not found</Typography>
    </>
  );
};

export default NotFound;
