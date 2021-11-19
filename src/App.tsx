import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ProtectedAdminRoute } from 'routes';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Pages
import {
  Portal,
  AdminLogin,
  Home,
  Applicants,
  Employees,
  OrganizationalChart,
  Requests,
  Attendance,
  NotFound,
  Evaluation,
} from 'pages';

// axios interceptors
import { setupInterceptorsTo } from 'axios/interceptors';
import axios from 'axios';

setupInterceptorsTo(axios);

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <Route exact path='/admin/login' component={AdminLogin} />

              {/* Admin */}
              <ProtectedAdminRoute exact path='/home' component={Home} />
              <ProtectedAdminRoute
                exact
                path='/applicants'
                component={Applicants}
              />
              <ProtectedAdminRoute
                exact
                path='/employees'
                component={Employees}
              />
              <ProtectedAdminRoute
                exact
                path='/organizational-chart'
                component={OrganizationalChart}
              />
              <ProtectedAdminRoute
                exact
                path='/requests'
                component={Requests}
              />
              <ProtectedAdminRoute
                exact
                path='/attendance'
                component={Attendance}
              />
              <ProtectedAdminRoute
                exact
                path='/evaluation'
                component={Evaluation}
              />

              {/* Misc */}
              <Route path='*' component={NotFound} />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
