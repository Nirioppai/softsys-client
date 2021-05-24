import React, { FC, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from '@material-ui/core';
import { LoginBase } from '../../components';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'mdi-material-ui';

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <LoginBase>
      <Typography variant='h1'>Sign In</Typography>
      <Typography variant='subtitle1' style={{ marginBottom: '2rem' }}>
        USER TYPE HERE
      </Typography>
      <TextField
        id='userId'
        label='User ID'
        defaultValue='JUST-CLICK-SIGN-IN'
      />
      <TextField
        id='password'
        label='Password'
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        defaultValue='1234'
      />
      {/* Temporarily set as link to bypass login */}
      <Button
        variant='contained'
        fullWidth
        size='large'
        style={{ marginBottom: '2rem' }}
        component={RouterLink}
        to='/home'
      >
        Sign In
      </Button>
      <Typography>
        <Link component={RouterLink} to='/reset-password'>
          Forgot password?
        </Link>
      </Typography>
    </LoginBase>
  );
};

export default Login;
