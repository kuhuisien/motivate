import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Card } from "antd";
import { HabitCardProps } from "../HabitCard.types";
import { DIFFICULTY_ID } from "../constant";
import HabitCard from "../HabitCard";
import Meta from "antd/lib/card/Meta";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { HabitType } from "lib/types/habit.types";
import { MOCK_DIFFICULTY_SETTINGS } from "./Mock";

describe("HabitCard", () => {
  let wrapper: ReactWrapper;
  let onSelectCardListener: jest.Mock<any, any>;
  let onClickButtonListener: jest.Mock<any, any>;

  let defaultProps: HabitCardProps;

  function renderHabitCard(args: any) {
    onSelectCardListener = jest.fn();
    onClickButtonListener = jest.fn();

    const MOCK_HABIT: HabitType = {
      taskTitle: "dummy title",
      notes: "dummy notes",
      difficultyId: DIFFICULTY_ID.EASY,
      createdAt: new Date().toISOString(),
    };
    defaultProps = {
      habit: MOCK_HABIT,
      difficultySettings: MOCK_DIFFICULTY_SETTINGS,
      setSelectedHabit: onSelectCardListener,
      handleClick: onClickButtonListener,
    };
    const props = { ...defaultProps, ...args };
    return mount(<HabitCard {...props} />);
  }

  beforeEach(() => {
    wrapper = renderHabitCard(null);
  });

  // ====================
  // CARD
  // ====================
  it("should render Card component correctly", () => {
    const component = wrapper.find(Card);
    expect(component.props().hoverable).toBe(true);
  });

  it("should display title of habit correctly on Card", () => {
    const component = wrapper.find(Card);
    expect(component.props().title).toBe(defaultProps.habit.taskTitle);
  });

  it("should invoke onClick handler after clicking Card", () => {
    wrapper.find(Card).simulate("click");

    expect(onSelectCardListener).toHaveBeenCalled();
  });

  // ====================
  // CONTENT
  // ====================

  it("should display notes correctly", () => {
    expect(wrapper.find(Meta).props().description).toBe(
      defaultProps.habit.notes
    );
  });

  // ====================
  // BUTTON
  // ====================
  it("should invoke onClick handler for Button correctly", () => {
    wrapper.find(SimpleButton).simulate("click");

    expect(onClickButtonListener).toHaveBeenCalled();
  });
});
