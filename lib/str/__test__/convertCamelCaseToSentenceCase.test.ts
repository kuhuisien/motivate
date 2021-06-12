import { camelToSentenceCase } from "../convertCamelCaseToSentenceCase";

describe("String util: convert camel case to sentense case ", () => {
  it("should convert camel case correctly", async () => {
    const text = "dummyText";
    const expected = "dummy text";
    const result = camelToSentenceCase(text);
    expect(result).toEqual(expected);
  });

  it("should convert camel case correctly", async () => {
    const text = "dummytext";
    const expected = "dummytext";
    const result = camelToSentenceCase(text);
    expect(result).toEqual(expected);
  });
});
