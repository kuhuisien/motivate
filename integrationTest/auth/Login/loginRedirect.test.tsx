import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import Login from "pages/auth/login";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => ({
      data: { user: { email: "qwe@hotmail.com" } },
      status: "",
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page Integration Test: existing session", () => {
  it("should redirect to Home if user has existing session", async () => {
    const replace = jest.fn();

    // Mock useRouter to return an object with the replace function
    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });

    render(<Login />);

    expect(replace).toHaveBeenCalledWith("/");
  });
});
