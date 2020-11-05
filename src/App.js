import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "./app/shared/Loading";
import Navigation from "./app/Navigation/Navigation";
import Home from "./app/Home/Home";
import About from "./app/About/About";
import Challenge from "./app/Challenge/Challenge";
import CurrentUser from "./app/User/CurrentUser";
import Clash from "../src/app/Clash/Clash";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./history";

// styles
import "./App.css";
import { Provider } from "react-redux";

// Store
import reducer from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <div id="app">
          <Navigation />
          <Switch>
            <Route path="/about" render={() => <About />} />
            <Route path="/user" render={() => <CurrentUser />} />
            <Route
              path="/challenge/:uniqueRef"
              render={(props) => <Challenge {...props} />}
            />
            <Route
              path="/clashes/:clashId"
              render={(props) => <Clash {...props} />}
            />
            <Route path="/" render={(s) => <Home />} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
