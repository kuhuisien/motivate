import { render } from "@testing-library/react";
import Login from "pages/auth/login";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => ({
      status: "loading",
    }),
  };
});

describe("Login Page Integration Test: load session", () => {
  it("should render empty jsx has loading session", async () => {
    render(<Login />);
  });
});
