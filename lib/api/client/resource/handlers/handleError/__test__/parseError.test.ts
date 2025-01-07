import { handleError } from "../handleError";

describe("Parse Axios error", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should parse error", () => {
    const mockAxiosError = {
      isAxiosError: true,
      message: "Request failed with status code 404",
      response: {
        status: 404,
        data: {
          message: "Not Found",
        },
      },
      code: "ERR_BAD_REQUEST",
    };

    expect(() => handleError(mockAxiosError)).toThrow(new Error("Not Found"));
  });

  it("should parse error", () => {
    const mockAxiosError = {
      isAxiosError: true,
      message: "error",
    };

    expect(() => handleError(mockAxiosError)).toThrow(new Error("error"));
  });
});
