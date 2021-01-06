import history from "../../history";
import ReactGA from "react-ga";

history.listen((location) => {
  ReactGA.pageview(location.pathname);
});
