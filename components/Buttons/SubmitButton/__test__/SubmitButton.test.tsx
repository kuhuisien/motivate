import React from "react";
import { SubmitButtonProps } from "../SubmitButton.types";
import SubmitButton from "../SubmitButton";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/FormProviderWrapper";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SubmitButton", () => {
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: SubmitButtonProps;

  function renderSubmitButton(args: any) {
    defaultProps = {
      children: "dummy child",
    };
    const props = { ...defaultProps, ...args };
    return render(
      <FormProvidersWrapper>
        <SubmitButton {...props} />
      </FormProvidersWrapper>
    );
  }

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map children prop correctly", () => {
    renderSubmitButton(null);
    expect(
      screen.getByText(defaultProps.children as string)
    ).toBeInTheDocument();
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("checks if click handler works correctly", async () => {
    onClickListener = jest.fn();
    renderSubmitButton({ onClick: onClickListener });
    await userEvent.click(screen.getByRole("button"));
    expect(onClickListener).toHaveBeenCalled();
  });
});
