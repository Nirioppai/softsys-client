import { FC, useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
import { Dropzone } from '../../components';
import { TabPanel, TabList, TabContext } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const LocalDropzone: FC = () => {
  return (
    <>
      <Typography variant='h3' component='h2'>
        Import from a file
      </Typography>
      <Typography gutterBottom>
        Please follow the format of the CSV file provided below before
        uploading.
      </Typography>
      <Dropzone />
    </>
  );
};

export default LocalDropzone;
