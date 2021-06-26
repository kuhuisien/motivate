import * as ERR_MSG from "../../errorMessage";
import { parseResponse } from "../parseResponse";

describe("Parse Axios response", () => {
  const URL = "https://url.to";
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should parse response", () => {
    const mockAxiosResponseDataPayload = { payload: "some data" };
    const axiosResponse = {
      status: 200,
      statusText: "OK",
      data: mockAxiosResponseDataPayload,
      headers: null,
      config: {},
    };

    expect(parseResponse(axiosResponse, URL)).toEqual(
      mockAxiosResponseDataPayload
    );
  });

  it("should throw error with message if it returns null payload", () => {
    const axiosResponse = {
      status: 200,
      statusText: "OK",
      data: null,
      headers: null,
      config: {},
    };
    const errorMessage = ERR_MSG.formatPayloadNullErrorMessage(URL);

    expect(() => parseResponse(axiosResponse, URL)).toThrow(
      new Error(errorMessage)
    );
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
  });

  it("should throw error with message if it returns undefined payload", () => {
    const axiosResponse = {
      status: 200,
      statusText: "OK",
      data: undefined,
      headers: null,
      config: {},
    };
    const errorMessage = ERR_MSG.formatPayloadUndefinedErrorMessage(URL);

    expect(() => parseResponse(axiosResponse, URL)).toThrow(
      new Error(errorMessage)
    );
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
  });
});
