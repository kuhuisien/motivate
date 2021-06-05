// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jsdom-global/register";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Enzyme needs to be installed with a configured adapter that
// corresponds to the React version we're using for unit tests to work.
//configure({ adapter: new EnzymeReactAdapter() });
Enzyme.configure({ adapter: new Adapter() });

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

  // mock hooks within unit test, if not, navigation in unit tests using these hook will throw a TypeError
  useRouter: () => ({
    pathname: "/",
  }),
}));
