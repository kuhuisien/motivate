import { initializeFirebase } from "../setup";

describe("util - firebse setup", () => {
  it("should run without error if it has not been initialized yet", () => {
    jest.mock("firebase/app", () => ({
      firebase: { apps: [], initializeApp: jest.fn() },
    }));

    initializeFirebase();
  });

  it("should run without error if it has been initialized before", () => {
    jest.mock("firebase/app", () => ({
      firebase: { apps: ["test"], initializeApp: jest.fn() },
    }));

    initializeFirebase();
  });
});
