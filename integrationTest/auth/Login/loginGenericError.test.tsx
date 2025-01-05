import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "pages/auth/login";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn().mockRejectedValue({ error: { message: "e" } }),
    useSession: () => ({
      data: "",
      status: "",
    }),
  };
});

describe("Login Page Integration Test: login error", () => {
  it("should show error message after user clicks login button", async () => {
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

    await waitFor(() =>
      expect(screen.getByText(/An error occured/i)).toBeInTheDocument()
    );
  });
});
