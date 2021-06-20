import { hashText, verifyHash } from "../auth";

describe("Auth Utility ", () => {
  it("should hash the text and return the hahsed result", async () => {
    const text = "dummy text";
    const result = await hashText(text);
    expect(result.length).toBeGreaterThan(text.length);
  });

  it("should return false when compareing the given data with its own value", async () => {
    const text = "dummy text";
    const result = await verifyHash(text, text);
    expect(result).toEqual(false);
  });

  it("should return false when comparing the given data with empty string", async () => {
    const text = "dummy text";
    const result = await verifyHash(text, "");
    expect(result).toEqual(false);
  });
});
