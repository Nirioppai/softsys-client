import { FC, MouseEvent, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LoginBase } from '../../components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'mdi-material-ui';
import { loginAdmin } from '../../services';
import { AdminLoginTypes } from '../../types';

const adminLoginSchema = Yup.object().shape({
  adminId: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login: FC = () => {
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const togglePasswordType = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (adminData: AdminLoginTypes) => {
    try {
      const { data } = await loginAdmin(adminData);
      setIsInvalid(false);
      localStorage.setItem('token', data.data);
      history.push('/home');
    } catch (err) {
      console.error(err);
      setIsInvalid(true);
    }
  };

  return (
    <LoginBase>
      <Typography variant='h1'>Sign In</Typography>
      <Typography variant='subtitle1' style={{ marginBottom: '2rem' }}>
        Admin
      </Typography>
      {isInvalid && (
        <Alert severity='error' style={{ marginBottom: '2rem' }}>
          Invalid credentials
        </Alert>
      )}
      <Formik
        initialValues={{
          adminId: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={adminLoginSchema}
      >
        <Form>
          <Field
            component={TextField}
            required
            name='adminId'
            label='Admin ID'
          />
          <Field
            component={TextField}
            required
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={togglePasswordType}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            fullWidth
            size='large'
            style={{ marginBottom: '2rem' }}
            type='submit'
          >
            Sign In
          </Button>
        </Form>
      </Formik>
      <Typography>
        <Link component={RouterLink} to='/reset-password'>
          Forgot password?
        </Link>
      </Typography>
    </LoginBase>
  );
};

export default Login;
