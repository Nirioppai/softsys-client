import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Grid, Hidden, Container } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    loginForm: {
      display: 'flex',
    },
    loginFormContainer: {
      maxWidth: 500,
      margin: 'auto',
    },
    loginInfo: {
      // temp color, placeholder
      backgroundColor: 'gray',
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
          <Container>Description goes here</Container>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LoginBase;
