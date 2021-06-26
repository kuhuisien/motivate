import firebase from "firebase/app";

export interface IterableElement {
  id: string;
  text: string;
}

export type GeneralResponse = { message: string };

export type HabitType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
  createdAt: Date | null;
};

export type HabitDbRecordType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
  createdAt: firebase.firestore.Timestamp;
};
