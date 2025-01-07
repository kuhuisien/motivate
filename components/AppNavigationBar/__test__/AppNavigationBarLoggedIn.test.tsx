import AppNavigationBar from "../AppNavigationBar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => {
  return {
    signOut: jest.fn().mockImplementation(() => {
      return {};
    }),
    useSession: () => ({
      data: { user: { email: "qwe@hotmail.com" } },
      status: "",
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => {
    return {
      pathname: "/habit/edit/[id]",
    };
  }),
}));

describe("AppNavigationBar: when user is logged in", () => {
  function renderAppNavigationBar(args: any) {
    return render(<AppNavigationBar />);
  }

  it("should display back button for configured routing path", async () => {
    renderAppNavigationBar(null);

    expect(
      screen.getByRole("button", {
        name: /Go back/i,
      })
    ).toBeInTheDocument();
  });

  it("should display correct header text for configured routing path", async () => {
    renderAppNavigationBar(null);

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("should invoke onClick handler", async () => {
    renderAppNavigationBar(null);
    await userEvent.click(
      screen.getByRole("button", {
        name: /Logout/i,
      })
    );
  });
});
