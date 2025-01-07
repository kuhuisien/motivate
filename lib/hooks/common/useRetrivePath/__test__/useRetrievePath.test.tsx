import { renderHook } from "@testing-library/react";
import { PATHS } from "lib/nav/routes";
import { useRetrievePath } from "../useRetrievePath";

describe("retrieveDisplayName", () => {
  it("should return path when it's found", () => {
    const { result } = renderHook(useRetrievePath, {
      initialProps: PATHS.HABIT.path,
    });
    expect(result.current).toEqual(PATHS.HABIT);
  });

  it("should return null when the path cannot be found", () => {
    const { result } = renderHook(useRetrievePath, {
      initialProps: "/some-path-that-does-not-exist",
    });
    expect(result.current).toEqual(null);
  });

  it("should return null when the input path is empty string", () => {
    const { result } = renderHook(useRetrievePath, {
      initialProps: "",
    });
    expect(result.current).toEqual(null);
  });

  it("should return null when the input path = NULL", () => {
    const { result } = renderHook(useRetrievePath, {
      initialProps: null as any,
    });
    expect(result.current).toEqual(null);
  });

  it("should return null when the input path = undefined", () => {
    const { result } = renderHook(useRetrievePath, {
      initialProps: undefined as any,
    });
    expect(result.current).toEqual(null);
  });
});
