import React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvidersWrapper } from "../FormProviderWrapper";

describe("Form Provider Wrapper", () => {
  it("should render", () => {
    render(
      <FormProvidersWrapper>
        <div>Some Text</div>
      </FormProvidersWrapper>
    );
    expect(screen.getByText("Some Text")).toBeInTheDocument();
  });
});
