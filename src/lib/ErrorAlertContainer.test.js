//Move to components
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorAlertContainer from "./ErrorAlertContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("When errorMessage and multiple errors are provided", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = (
      <ErrorAlertContainer
        errorMessage="the error msg"
        errors={{
          email: "no good",
          face: "so ugly",
          snake_case: "good",
        }}
      />
    );
    wrapper = shallow(errorAlertComponent);
  });
  test("it should render alert", () => {
    expect(wrapper.exists("Alert")).toBe(true);
  });
  test("it should show error msg", () => {
    expect(wrapper.contains("the error msg")).toBe(true);
  });
  test("it should list errors", () => {
    expect(wrapper.contains("Email no good")).toBe(true);
    expect(wrapper.contains("Face so ugly")).toBe(true);
  });
  test("it should make snake case sentence case", () => {
    expect(wrapper.contains("Snake Case good")).toBe(true);
  });
});

describe("When errors are an array of strings", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = (
      <ErrorAlertContainer errors={["You are no good", "Your face is ugly"]} />
    );
    wrapper = shallow(errorAlertComponent);
  });
  test("it should show bare error detail", () => {
    expect(wrapper.find("#err-0").text()).toBe(" You are no good");
    expect(wrapper.find("#err-1").text()).toBe(" Your face is ugly");
  });
});

describe("When no properties are provided", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = <ErrorAlertContainer />;
    wrapper = shallow(errorAlertComponent);
  });
  test("it should not render alert", () => {
    expect(wrapper.exists("Alert")).toBe(false);
  });
});

describe("When empty properties are provided", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = (
      <ErrorAlertContainer errorMessage="" errors={[]} />
    );
    wrapper = shallow(errorAlertComponent);
  });
  test("it should not render alert", () => {
    expect(wrapper.exists("Alert")).toBe(false);
  });
});

describe("When only errorMessage is provided", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = (
      <ErrorAlertContainer errorMessage="nasty exception" />
    );
    wrapper = shallow(errorAlertComponent);
  });
  test("it should show error msg", () => {
    expect(wrapper.contains("nasty exception")).toBe(true);
  });
});

describe("When only errors are provided", () => {
  var wrapper;
  beforeEach(() => {
    const errorAlertComponent = (
      <ErrorAlertContainer errors={{ email: "no good" }} />
    );
    wrapper = shallow(errorAlertComponent);
  });
  test("it should show error detail", () => {
    expect(wrapper.contains("Email no good")).toBe(true);
  });
  test("it should show default error message", () => {
    expect(
      wrapper.contains(
        "Unhandled exception occurred. Please try again. If the problem persists please email support@soundcla.sh"
      )
    ).toBe(true);
  });
});
