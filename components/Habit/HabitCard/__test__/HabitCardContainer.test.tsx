import React from "react";
import HabitCardContainer from "../HabitCardContainer";
import { MOCK_DIFFICULTY_SETTINGS } from "./Mock";
import { HabitType } from "lib/types/habit.types";
import { renderWithProviders } from "lib/TestUtil/ProviderWrapper/ReduxProviderWrapper";
import { DIFFICULTY_ID } from "../constant";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Habit Card Container", () => {
  let onSelectCardListener: jest.Mock<any, any>;

  beforeEach(() => {
    const MOCK_HABIT: HabitType = {
      taskTitle: "dummy title",
      notes: "dummy notes",
      difficultyId: DIFFICULTY_ID.EASY,
      createdAt: new Date().toISOString(),
    };

    onSelectCardListener = jest.fn();

    renderWithProviders(
      <HabitCardContainer
        habit={MOCK_HABIT}
        handleClick={onSelectCardListener}
      />,
      {
        preloadedState: {
          systemSetting: {
            difficultySettings: MOCK_DIFFICULTY_SETTINGS,
          },
        },
      }
    );
  });

  it("should be able to invoke button click correctly", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(onSelectCardListener).toHaveBeenCalledWith(1);
  });
});
