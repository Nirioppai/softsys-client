import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';

// Pages
import { Applicants, Home, Portal, Login, NotFound } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Helmet
          titleTemplate='%s - Human Resource Information System'
          defaultTitle='Human Resource Information System'
        />
        <BrowserRouter>
          <Switch>
            {/* Auth */}
            <Route exact path='/' component={Portal} />
            <Route exact path='/login' component={Login} />

            {/* Home */}
            <Route exact path='/home' component={Home} />

            {/* Admin */}
            <Route exact path='/applicants' component={Applicants} />

            {/* Misc */}
            <Route path='*' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
