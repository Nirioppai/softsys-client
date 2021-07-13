import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ProtectedAdminRoute } from 'routes';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';

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
  Imports,
  StaffManagement,
} from 'pages';

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
            <ProtectedAdminRoute exact path='/requests' component={Requests} />
            <ProtectedAdminRoute
              exact
              path='/attendance'
              component={Attendance}
            />
            <ProtectedAdminRoute exact path='/imports' component={Imports} />
            <ProtectedAdminRoute
              exact
              path='/staff-management'
              component={StaffManagement}
            />

            {/* Misc */}
            <Route path='*' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
