import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "pages/auth/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn().mockImplementation(() => {
      return {};
    }),
    useSession: () => ({
      data: "",
      status: "",
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page Integration Test: positive scenarios", () => {
  it("should proceed to Home after user successfully login", async () => {
    const replace = jest.fn();

    // Mock useRouter to return an object with the replace function
    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });

    render(<Login />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Email"), "test@hotmail.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");

    await user.click(
      screen.getByRole("button", {
        name: /LOGIN/i,
      })
    );

    // check that signIn function was called
    expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      email: "test@hotmail.com",
      password: "password123",
    });

    expect(replace).toHaveBeenCalledWith("/");
  });

  it("should proceed to Google Signin after user click at google signin button", async () => {
    const replace = jest.fn();

    // Mock useRouter to return an object with the replace function
    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });

    render(<Login />);

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", {
        name: /Sign in with Google/i,
      })
    );

    // check that signIn function was called
    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("should proceed to Google Signin after user click at google signin button", async () => {
    const push = jest.fn();

    // Mock useRouter to return an object with the replace function
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });

    render(<Login />);

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", {
        name: /Create an account/i,
      })
    );

    expect(push).toHaveBeenCalledWith("/auth/signup");
  });
});
