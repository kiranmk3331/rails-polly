import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { initializeLogger } from "common/logger";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Signup from "components/Authentication/Signup";
import { either, isEmpty, isNil } from "ramda";
import Login from "components/Authentication/Login";
import PageLoader from "components/PageLoader";
import CreatePoll from "components/Polls/CreatePoll";
import EditPoll from "components/Polls/EditPoll";
import NavBar from "components/NavBar";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "./helpers/storage";
import ShowPoll from "./components/Polls/ShowPoll";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <LoggedInRoutes isLoggedIn={isLoggedIn} />
      ) : (
        <NotLoggedInRoutes isLoggedIn={isLoggedIn} />
      )}
    </Router>
  );
};

const LoggedInRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/polls/new" component={CreatePoll} />
      <Route exact path="/polls/:id/show" component={ShowPoll} />
      <Route exact path="/polls/:id/edit" component={EditPoll} />
    </Switch>
  );
};

const NotLoggedInRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="*" redirectRoute="/login" />
    </Switch>
  );
};

export default App;
