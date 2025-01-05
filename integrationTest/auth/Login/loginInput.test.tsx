import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "pages/auth/login";

describe("Login Page Integration Test: login input", () => {
  it("should show validation mesage if user types invalid email", async () => {
    render(<Login />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Email"), "qq");

    await waitFor(() =>
      expect(
        screen.getByText(/The input is not a valid email/i)
      ).toBeInTheDocument()
    );
  });

  it("should not show email validation message if users types valid email", async () => {
    render(<Login />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Email"), "test@hotmail.com");
    await waitFor(() =>
      expect(
        screen.queryByText(/The input is not a valid email/i)
      ).not.toBeInTheDocument()
    );
  });
});
