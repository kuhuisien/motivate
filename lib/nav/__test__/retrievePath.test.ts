import { retrievePath } from "../retrievePath";
import { PATHS } from "../routes";

describe("retrieveDisplayName", () => {
  it("should return path when it's found", () => {
    expect(retrievePath(PATHS.HABIT.path)).toEqual(PATHS.HABIT);
  });

  it("should return null when the path cannot be found", () => {
    expect(retrievePath("/some-path-that-does-not-exist")).toEqual(null);
  });

  it("should return null when the input path = ''", () => {
    expect(retrievePath("")).toEqual(null);
  });

  it("should return null when the input path = NULL", () => {
    expect(retrievePath(null as any)).toEqual(null);
  });

  it("should return null when the input path = undefined", () => {
    expect(retrievePath(undefined as any)).toEqual(null);
  });
});
