import HandleApiError from "./HandleApiError";

describe("Handle API Error - ", ()=>{
  describe("when errorMessage and errors provided", ()=>{
    const messageResponse = "The error message";
    const errorsResponse = ["error1", "error2"];

    const err = {
      response: {
        data: {
          message: messageResponse,
          errors: errorsResponse
        },
      }
    }

    const {errorMessage, errors, type} = HandleApiError(err);
    test("should extract message", ()=>{ expect(errorMessage).toEqual(messageResponse) });
    test("should extract errors", ()=>{ expect(errors).toEqual(errorsResponse) });
    test("should deduce type", ()=>{ expect(type).toEqual("Validation") });
  })

  describe("when response is malformed", ()=>{
    const err = {
      response: {},
      message: "unhandled exception message"
    }

    const {errorMessage, errors, type} = HandleApiError(err);
    test("should extract message", ()=>{ expect(errorMessage).toEqual("unhandled exception message") });
    test("should deduce type", ()=>{ expect(type).toEqual('Unhandled') });
  })
})