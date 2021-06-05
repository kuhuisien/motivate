import React from "react";
import { shallow } from "enzyme";
import { FormProvidersWrapper } from "../ProviderWrapper";

describe("Provider Wrapper", () => {
  it("should render", () => {
    const wrapper = shallow(
      <FormProvidersWrapper>
        <div>Some Text</div>
      </FormProvidersWrapper>
    );
    expect(wrapper.find("div").text()).toEqual("Some Text");
  });
});
