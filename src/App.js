import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "./app/shared/Loading";
import Navigation from "./app/Navigation/Navigation";
import Home from "./app/Home/Home";
import About from "./app/About/About";
import Challenge from "./app/Challenge/Challenge";
import CurrentUser from "./app/User/CurrentUser";
import Clash from "../src/app/Clash/Clash";
import ClashPlaylist from "../src/app/Clash/ClashPlaylist";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./history";
import "./app/shared/GoogleAnalytics";
import UserUnsubscribe from "./app/UserUnsubscribe/UserUnsubscribe";
import VersionTag from "./app/VersionTag";
import ReactGA from "react-ga";

// styles
import "./App.css";
import { Provider } from "react-redux";

// Store
import reducer from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const trackingId = "UA-55070071-1";
const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  const { isLoading, error } = useAuth0();

  ReactGA.initialize(trackingId);

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
          <VersionTag />
          <Switch>
            <Route path="/about" render={() => <About />} />
            <Route path="/user" render={() => <CurrentUser />} />
            <Route
              path="/unsubscribe/:unsubscribeId"
              render={(props) => <UserUnsubscribe {...props} />}
            />
            <Route
              path="/challenge/:uniqueRef"
              render={(props) => <Challenge {...props} />}
            />
            <Route
              path="/clashes/:clashId/playlist"
              render={(props) => <ClashPlaylist {...props} />}
            />
            <Route
              path="/clashes/:clashId/rounds/:roundId"
              render={(props) => <Clash {...props} />}
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
