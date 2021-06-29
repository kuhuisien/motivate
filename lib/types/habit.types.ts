import firebase from "firebase/app";
import { GeneralResponse } from "./common/data.types";

type Habit = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
};

// Habit Item structure in db
export type HabitDbRecordType = Habit & {
  createdAt: firebase.firestore.Timestamp;
};

// Habit Item structure returned by API
export type HabitType = Habit & {
  createdAt: string | null;
};

// Habit Listing Response returned by API
export type HabitListingResponseType = GeneralResponse & {
  habitList: HabitType[];
};
