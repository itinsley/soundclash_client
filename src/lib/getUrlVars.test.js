import getUrlVars from "./getUrlVars";

describe("getUrlVars", () => {
  const url = "https://www.youtube.com/watch?v=VUUNPGsh5EI&ab_channel=NaHg";
  const vars = getUrlVars(url);

  test("extracts params identified by ?", () => {
    expect(vars["v"]).toEqual("VUUNPGsh5EI");
  });
  test("extracts params identified by &", () => {
    expect(vars["ab_channel"]).toEqual("NaHg");
  });
});
