import React from "react";
import { HabitCardProps } from "../HabitCard.types";
import { DIFFICULTY_ID } from "../constant";
import HabitCard from "../HabitCard";
import { HabitType } from "lib/types/habit.types";
import { MOCK_DIFFICULTY_SETTINGS } from "./Mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("HabitCard", () => {
  let defaultProps: HabitCardProps;

  function renderHabitCard(args: any) {
    const MOCK_HABIT: HabitType = {
      id: "dummy id",
      taskTitle: "dummy title",
      notes: "dummy notes",
      difficultyId: DIFFICULTY_ID.EASY,
      tags: [],
      createdAt: new Date().toISOString(),
    };
    defaultProps = {
      habit: MOCK_HABIT,
      difficultySettings: MOCK_DIFFICULTY_SETTINGS,
    };
    const props = { ...defaultProps, ...args };
    return render(<HabitCard {...props} />);
  }

  beforeEach(() => {
    renderHabitCard(null);
  });

  // ====================
  // CARD
  // ====================

  it("should display title of habit correctly on Card", () => {
    const title = defaultProps.habit.taskTitle || "";
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  // ====================
  // CONTENT
  // ====================

  it("should display notes correctly", () => {
    const description = defaultProps.habit.notes || "";
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // ====================
  // BUTTON
  // ====================
  it("should invoke onClick handler for Button without error", async () => {
    await userEvent.click(screen.getByRole("button"));
  });
});
