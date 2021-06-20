export interface HabitCardProps {
  habit: HabitType;
}

export type HabitType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
};
