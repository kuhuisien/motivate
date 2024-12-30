// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jsdom-global/register";

/**
 * == GLOBAL MOCKS ==
 *
 * Global mocks for every test case. Run for every test suite in every test file.
 * Use this in order to mock implementation detials of module dependencies which
 * don't need to be tested.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("next/router", () => ({
  // ensure functionalities of original module are preserved
  ...jest.requireActual<{}>("next/router"),

  // mock hooks within unit test
  useRouter: () => ({
    pathname: "/",
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  // ensure functionalities of original module are preserved
  ...jest.requireActual<{}>("next-auth/react"),

  // mock hooks within unit test to avoid error message in console, and to mock the session for testing auth UI
  useSession: () => [
    {
      session: {
        expires: "1",
        user: { email: "a", name: "Delta", image: "c" },
      },
    },
  ],
  // mock hooks within unit test to avoid error message in console
  signOut: jest.fn(),
}));
