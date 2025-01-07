import { RadioButtonProps, RadioType as RadioType } from "../RadioButton.types";
import RadioButton from "../RadioButton";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/FormProviderWrapper";
import { render, screen } from "@testing-library/react";

describe("RadioButton", () => {
  let defaultProps: RadioButtonProps;

  function renderRadioButton(args: any) {
    const dummyRadioButtonSelectionValues: RadioType[] = [
      { id: "1", body: <div>selection 1</div> },
      { id: "2", body: <div>selection 2</div> },
    ];
    defaultProps = {
      name: "dummyName",
      values: dummyRadioButtonSelectionValues,
    };
    const props = { ...defaultProps, ...args };
    return render(
      <FormProvidersWrapper>
        <RadioButton {...props} />
      </FormProvidersWrapper>
    );
  }

  // ====================
  // MAPPING PROPS
  // ====================

  it("should map values prop correctly to render Radio Button", () => {
    renderRadioButton(null);
    expect(screen.getAllByRole("radio").length).toBe(2);
    expect(screen.getByText("selection 1")).toBeInTheDocument();
    expect(screen.getByText("selection 2")).toBeInTheDocument();
  });

  it("should map defaultValue prop correctly", () => {
    const defaultValue = "1";
    renderRadioButton({ defaultValue });
    const option1 = screen.getAllByRole("radio")[0];
    expect(option1).toBeChecked();
  });
});
