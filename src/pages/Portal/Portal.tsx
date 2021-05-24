import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { LoginBase } from '../../components';

// These are routed to `/login` for now.
// If will be implemented in actual, it would be something like `/employee/login`.
const userTypes = [
  {
    label: 'Employee',
    link: '/login',
  },
  {
    label: 'Admin',
    link: '/login',
  },
];

const Login: FC = () => {
  return (
    <LoginBase>
      <Typography variant='h1'>Hello Colleague!</Typography>
      <Typography variant='subtitle1' style={{ marginBottom: '2rem' }}>
        Please pick your destination to continue.
      </Typography>
      {userTypes.map((userType, index) => (
        <Button
          variant='contained'
          fullWidth
          size='large'
          style={{ marginBottom: '1rem' }}
          key={index}
          component={Link}
          to={userType.link}
        >
          {userType.label}
        </Button>
      ))}
    </LoginBase>
  );
};

export default Login;
