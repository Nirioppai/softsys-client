import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Grid, Hidden, Container, Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    loginForm: {
      display: 'flex',
      backgroundColor: theme.palette.background.default,
    },
    loginFormContainer: {
      maxWidth: 500,
      margin: 'auto',
    },
    loginInfo: {
      // temp color, placeholder
      backgroundColor: '#FAFAFA',
    },
    paper: {
      padding: theme.spacing(2),
      height: '100%',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
    itemImage: {
      maxWidth: '100%',
      display: 'flex',
      objectFit: 'contain',
      margin: `0 auto ${theme.spacing(1)}px`,
    },
    itemLabel: {
      textAlign: 'center',
    },
    mainTypography: {
      color: '#172B4D',
      fontWeight: 700,
      fontSize: 54,
    },
  })
);

interface LoginBaseProps {
  children: ReactNode;
  className?: string;
}

const LoginBase: FC<LoginBaseProps> = ({ children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container {...rest} className={clsx(classes.root, className)}>
      <Grid item xs md={6} className={classes.loginForm}>
        <Container className={classes.loginFormContainer}>
          <>{children}</>
        </Container>
      </Grid>
      <Hidden smDown>
        <Grid item xs className={classes.loginInfo}>
          <Paper className={classes.paper}>
            <br />
            <br />
            <br />
            <img
              className={classes.itemImage}
              src='https://i.imgur.com/jcswlEQ.png'
              alt='coverimage'
            />
          </Paper>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LoginBase;
