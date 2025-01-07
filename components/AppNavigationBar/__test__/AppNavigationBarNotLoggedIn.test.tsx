import AppNavigationBar from "../AppNavigationBar";
import { render, screen } from "@testing-library/react";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => ({
      data: "",
      status: "",
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => {
    return {
      pathname: "",
    };
  }),
}));

describe("AppNavigationBar: when user is not logged in", () => {
  function renderAppNavigationBar(args: any) {
    return render(<AppNavigationBar />);
  }

  it("should display correct header text", async () => {
    renderAppNavigationBar(null);

    expect(screen.getByText("Aspiro")).toBeInTheDocument();
  });

  it("should not display Logout button", async () => {
    renderAppNavigationBar(null);

    expect(
      screen.queryByRole("button", {
        name: /Logout/i,
      })
    ).not.toBeInTheDocument();
  });
});
