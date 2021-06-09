import { hashText } from "../auth";

describe("Auth Utility ", () => {
  it("should hash the text and return the hahsed result", async () => {
    const text = "dummy text";
    const result = await hashText(text);
    expect(result.length).toBeGreaterThan(text.length);
  });
});
