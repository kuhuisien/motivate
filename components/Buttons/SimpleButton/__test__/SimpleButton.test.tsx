import React from "react";
import { SimpleButtonProps } from "../SimpleButton.types";
import SimpleButton from "../SimpleButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SimpleButton", () => {
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: SimpleButtonProps;

  function renderSimpleButton(args: any) {
    defaultProps = {
      children: "dummy child",
    };
    const props = { ...defaultProps, ...args };
    return render(<SimpleButton {...props} />);
  }

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map children prop correctly", () => {
    renderSimpleButton(null);
    expect(
      screen.getByText(defaultProps.children as string)
    ).toBeInTheDocument();
  });

  it("should map default disabled prop correctly", () => {
    renderSimpleButton(null);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should map disabled prop correctly", () => {
    renderSimpleButton({ disabled: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("should invoke onClick handler", async () => {
    onClickListener = jest.fn();
    renderSimpleButton({ onClick: onClickListener });
    await userEvent.click(screen.getByRole("button"));
    expect(onClickListener).toHaveBeenCalled();
  });
});
