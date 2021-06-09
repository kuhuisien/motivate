import axios from "axios";
import { MOCK_SIGNUP_RESPONSE } from "./signup.mock";
import { signup } from "../signup";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API call /auth/signup", () => {
  const MOCK_EMAIL = "abc@hotmail.com";
  const MOCK_PASSWORD = "test123";

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockedAxios.post.mockReset();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should invoke API when called", async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      statusText: "OK",
      data: MOCK_SIGNUP_RESPONSE,
    });

    const resolvedValue = await signup(MOCK_EMAIL, MOCK_PASSWORD);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(resolvedValue).toEqual(MOCK_SIGNUP_RESPONSE);
  });
});
