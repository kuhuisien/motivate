export interface HabitCardProps {
  habit: HabitType;

  setSelectedHabit: (habit: HabitType) => void;
}

export type HabitType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
};
