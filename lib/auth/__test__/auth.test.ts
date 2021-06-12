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

  it("should return true when comparing the given data with its hashed value", async () => {
    const text = "dummy text";
    const hasedText =
      "$2a$12$a..dcWLMz6qSdr93gxRLvO5lN.ANVgQQrPSlQRoApHUiXxKmfVkNO";
    const result = await verifyHash(text, hasedText);
    expect(result).toEqual(true);
  });
});
