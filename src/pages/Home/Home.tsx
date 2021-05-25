import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Paper, Box, ButtonBase } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { MainLayout } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBase: {
      width: '100%',
    },
    paper: {
      padding: '1.5rem',
      height: '100%',
      width: '100%',
    },
    itemLabel: {
      textAlign: 'center',
    },
    itemImage: {
      width: '100%',
      height: 200,
      marginBottom: theme.spacing(2),
      backgroundColor: grey[300],
    },
  })
);

const items = [
  {
    label: 'Applicants',
    link: '/applicants',
  },
  {
    label: 'Employees',
    link: '/Employees',
  },
  {
    label: 'Organizational Chart',
    link: '/organizational-chart',
  },
  {
    label: 'Requests',
    link: '/requests',
  },
  {
    label: 'Attendance',
    link: '/attendance',
  },
];

const Home = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Typography variant='h1' gutterBottom>
        Hello, John
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to={item.link}
            >
              <Paper className={classes.paper}>
                <Box className={classes.itemImage} />
                <Typography
                  variant='h3'
                  component='h2'
                  className={classes.itemLabel}
                >
                  {item.label}
                </Typography>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
