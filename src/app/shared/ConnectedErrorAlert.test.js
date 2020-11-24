// Redux Store wiring
import reducer from "../../reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//Tested components
import ConnectedErrorAlert from "./ConnectedErrorAlert";
import { setErrorAction } from "../../actions";

// Stub
const store = createStore(reducer, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <ConnectedErrorAlert context={"ERROR_CONTEXT_A"} />
    </Provider>
  );
};

//Test code
import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("When error action is dispatched for different context", () => {
  var wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
    store.dispatch(
      setErrorAction({
        errorMessage: "stubbed error message",
        context: "ERROR_CONTEXT_B",
      })
    );
  });
  test("it will not show an error", () => {
    expect(wrapper.contains("stubbed error message")).toBe(false);
  });
});

describe("When error action is dispatched for the specified context", () => {
  var wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
    store.dispatch(
      setErrorAction({
        errorMessage: "stubbed error message",
        context: "ERROR_CONTEXT_A",
      })
    );
  });
  test("it will show an error", () => {
    // Having to pause for async dispatch is ugly.. but the nature of the beast.
    setTimeout(() => {
      expect(wrapper.contains("stubbed error message")).toBe(true), 1;
    });
  });
});
