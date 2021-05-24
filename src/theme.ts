import { createMuiTheme } from '@material-ui/core';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: defaultTheme.typography.pxToRem(35),
      fontWeight: 500,
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(28),
      fontWeight: 500,
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(21),
      fontWeight: 500,
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 500,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 500,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(12),
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
    subtitle2: {
      fontSize: defaultTheme.typography.pxToRem(12),
    },
    body1: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
  },
  props: {
    MuiButton: {
      color: 'primary',
    },
    MuiFormControl: {
      margin: 'normal',
    },
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    },
  },
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: '1rem',
      },
      marginDense: {
        marginTop: 0,
        marginBottom: '0.5rem',
      },
    },
  },
});
