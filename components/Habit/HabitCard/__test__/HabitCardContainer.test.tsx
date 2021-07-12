import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { initialState as systemSettingInitialState } from "lib/redux/systemSetting";
import HabitCardContainer from "../HabitCardContainer";
import HabitCard from "../HabitCard";
import { SystemSettingState } from "lib/redux/systemSetting/systemSetting.types";
import { MOCK_DIFFICULTY_SETTINGS } from "./Mock";
import { setSelectedHabit } from "lib/redux/habit";
import { HabitType } from "lib/types/habit.types";

const configureMockStore = configureStore();

describe("My Info Profile Container", () => {
  let wrapper: ShallowWrapper;
  let systemSettingState: SystemSettingState;
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    // ensure clean copies of every state before every test case
    systemSettingState = {
      ...systemSettingInitialState,
      difficultySettings: MOCK_DIFFICULTY_SETTINGS,
    };

    store = configureMockStore({
      systemSetting: systemSettingState,
    });
    wrapper = shallow(<HabitCardContainer store={store} />);
  });

  // ============================
  // Tests for Map State to Props
  // ============================

  it("should render the connected component", () => {
    expect(wrapper.find(HabitCard)).toHaveLength(1);
  });

  it("should map difficultySettings correctly", () => {
    expect(wrapper.find(HabitCard).props().difficultySettings).toHaveLength(
      MOCK_DIFFICULTY_SETTINGS.length
    );
  });

  // ============================
  // Tests for Map Dispatch to Props
  // ============================

  it("should be able to invoke resetPreventDirectBackNavigationState", () => {
    const habit: HabitType = {
      taskTitle: "dummyTaskTitle",
      notes: "dummyNotes",
      difficultyId: "dummyDifficultyId",
      createdAt: "dummyCreatedAt",
    };
    const component = wrapper.find(HabitCard);
    component.props().setSelectedHabit(habit);
    const expectedActions = [setSelectedHabit(habit)];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
