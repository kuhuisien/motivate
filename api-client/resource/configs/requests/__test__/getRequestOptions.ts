import { getRequestOptions } from "../getRequestOptions";

describe("Request Options", () => {
  it("should not be falsy", () => {
    expect(getRequestOptions()).not.toBeFalsy();
  });
});
