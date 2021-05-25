import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Paper, ButtonBase } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBase: {
      width: '100%',
      borderRadius: theme.shape.borderRadius,
    },
    paper: {
      padding: theme.spacing(2),
      height: '100%',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
    itemLabel: {
      textAlign: 'center',
    },
    itemImage: {
      maxWidth: '100%',
      height: 200,
      display: 'flex',
      objectFit: 'contain',
      margin: `0 auto ${theme.spacing(1)}px`,
    },
  })
);

const items = [
  {
    label: 'Applicants',
    link: '/applicants',
    image:
      'https://image.freepik.com/free-vector/woman-talking-with-her-future-job-leader_23-2148621748.jpg',
  },
  {
    label: 'Employees',
    link: '/employees',
    image:
      'https://image.freepik.com/free-vector/internship-job-illustration_23-2148722413.jpg',
  },
  {
    label: 'Organizational Chart',
    link: '/organizational-chart',
    image:
      'https://image.freepik.com/free-vector/flat-hand-drawn-people-analyzing-growth-chart-illustration_23-2148861358.jpg',
  },
  {
    label: 'Requests',
    link: '/requests',
    image:
      'https://image.freepik.com/free-vector/pack-flat-people-asking-questions_23-2148917153.jpg',
  },
  {
    label: 'Attendance',
    link: '/attendance',
    image:
      'https://image.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg',
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
                <img
                  src={item.image}
                  alt={item.label}
                  className={classes.itemImage}
                />
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
