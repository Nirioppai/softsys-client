import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

// Pages
import LandingPage from "./containers/LandingPage";
import NotFoundPage from "./containers/NotFoundPage";

function App() {
  return (
    <>
      <CssBaseline />
      <HelmetProvider>
        <Helmet
          titleTemplate="%s - Human Resource Information System"
          defaultTitle="Human Resource Information System"
        />
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
