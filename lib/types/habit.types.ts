import firebase from "firebase/app";
import { GeneralResponse } from "./common/data.types";

type Habit = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
  tags: string[];
};

// Habit Item structure in db
export type HabitDbRecordType = Habit & {
  createdAt: firebase.firestore.Timestamp;
  userId: string;
};

// Habit Item structure returned by API
export type HabitType = Habit & {
  createdAt: string | null;
  id: string;
};

export type PaginationType = {
  pageNumber: number;
  pageSize: number;
  totalSize: number;
  hasMore: boolean;
};

// Habit Listing Response returned by API
export type HabitListingResponseType = GeneralResponse & {
  habitList: HabitType[];
  pagination?: PaginationType | null;
};

export type TagListingResponseType = GeneralResponse & {
  tagList: string[];
};
