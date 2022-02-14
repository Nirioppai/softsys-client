import React, { FC, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminWrapper } from 'components';
import QRCode from "react-qr-code";
import { 
  Typography, 
  Grid,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
const QuickResponseCode: FC = () => {
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(0);
  const userId = localStorage.getItem('ams-user-id');
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth()+1;
  const day = newDate.getDate();

  const div = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AdminWrapper>
        <Helmet title='Attendance Monitoring System' />
        <Typography variant='h4' gutterBottom>
          Use this code for attendance
        </Typography>
        <br/>
        <Grid container>
          <Grid item xs={12}>
            <Paper square style={{marginBottom: '3rem'}}>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="IN" style={{width: '50%'}}/>
                <Tab label="OUT"  style={{width: '50%'}}/>
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={8} ref={div}>
            {value === 0 ?
              <QRCode size={width} value={`in-${userId}-${month}_${day}_${year}`} />
            :
              <QRCode size={width} value={`out-${userId}-${month}_${day}_${year}`} />
            }
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </AdminWrapper>
    </>
  );
};

{/* <Grid container>
  <Grid item xs={1} />
  <Grid item xs={10} >
    <QRCode value="out-userId-06_12_2021" />
  </Grid>
  <Grid item xs={1} />
</Grid> */}

export default QuickResponseCode;
