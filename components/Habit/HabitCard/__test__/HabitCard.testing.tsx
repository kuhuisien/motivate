import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Card, Avatar } from "antd";
import { HabitCardProps, HabitType } from "../HabitCard.types";
import { DIFFICULTY_ID, EASY_ICON, MEDIUM_ICON, HARD_ICON } from "../constant";
import HabitCard from "../HabitCard";
import Meta from "antd/lib/card/Meta";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";

describe("HabitCard", () => {
  let wrapper: ReactWrapper;

  let defaultProps: HabitCardProps;

  function renderHabitCard(args: any) {
    const MOCK_HABIT: HabitType = {
      taskTitle: "dummy title",
      notes: "dummy notes",
      difficultyId: DIFFICULTY_ID.EASY,
    };
    defaultProps = {
      habit: MOCK_HABIT,
      setSelectedHabit: jest.fn(),
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
  });

  // ====================
  // CONTENT
  // ====================
  it("should display notes correctly", () => {
    expect(wrapper.find(Meta).props().description).toBe(
      defaultProps.habit.notes
    );
  });

  it("should display easy icon correctly when it belong to easy difficulty", () => {
    const component = wrapper.find(Meta).props().avatar;
    const expected = <Avatar src={EASY_ICON} />;
    expect(component).toBe(expected);
  });

  it("should display medium icon correctly when it belong to medium difficulty", () => {
    wrapper = renderHabitCard({ difficultyId: DIFFICULTY_ID.MEDIUM });
    const component = wrapper.find(Meta).props().avatar;
    const expected = <Avatar src={MEDIUM_ICON} />;
    expect(component).toBe(expected);
  });

  it("should display hard icon correctly when it belong to hard difficulty", () => {
    wrapper = renderHabitCard({ difficultyId: DIFFICULTY_ID.HARD });
    const component = wrapper.find(Meta).props().avatar;
    const expected = <Avatar src={HARD_ICON} />;
    expect(component).toBe(expected);
  });

  // ====================
  // BUTTON
  // ====================
  it("should invoke onClick handler for Button correctly", () => {
    wrapper.find(SimpleButton).simulate("click");
  });
});
