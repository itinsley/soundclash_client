import getUrlId from "./getUrlId";

describe("getUrlId", () => {
  test("should parse format for youtube.com", () => {
    expect(getUrlId("https://www.youtube.com/watch?v=H81VWKBt45I")).toEqual(
      "H81VWKBt45I"
    );
    expect(getUrlId("https://m.youtube.com/watch?v=H81VWKBt45I")).toEqual(
      "H81VWKBt45I"
    );
    expect(getUrlId("https://youtube.com/watch?v=H81VWKBt45I")).toEqual(
      "H81VWKBt45I"
    );
  });

  test("should parse format for youtu.be", () => {
    expect(getUrlId("https://youtu.be/H81VWKBt45I")).toEqual("H81VWKBt45I");
  });

  test("should throw exception if unrecognised URI", () => {
    expect(() => {
      getUrlId("https://youtu.xe/none/none");
    }).toThrowError("Youtube URL provided is unrecognised");
  });
});
