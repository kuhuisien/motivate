import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  HABITS_COLLECTION,
  HABIT_FIELD,
  USERS_COLLECTION,
} from "lib/firebase/constant";
import {
  BAD_RERQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  AUTHENTICATION_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  GET,
  OK_SUCCESS_STATUS_CODE,
  SUCCESS_MESSAGE,
  METHOD_NOT_ALLOW_ERROR_MESSAGE,
} from "lib/api/server/constant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { HabitListingResponseType, HabitType } from "lib/types/habit.types";

const GENERIC_HABIT_LISTING_ERROR_RESPONSE = { habitList: [] };

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 5;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HabitListingResponseType>
) {
  try {
    if (req.method != GET) {
      res.status(BAD_RERQUEST_STATUS_CODE).json({
        ...GENERIC_HABIT_LISTING_ERROR_RESPONSE,
        message: METHOD_NOT_ALLOW_ERROR_MESSAGE,
      });
      return;
    }

    var response: HabitListingResponseType;

    // authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      response = {
        ...GENERIC_HABIT_LISTING_ERROR_RESPONSE,
        message: AUTHENTICATION_ERROR_MESSAGE,
      };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    const userId = session.user?.email || "";

    // retrieve db records
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);
    var userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      await userRef.set({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        point: 0,
      });
    }

    var habitQuery = firebase
      .firestore()
      .collection(HABITS_COLLECTION)
      .where(HABIT_FIELD.USER_ID, "==", userId);

    const tags = req.query["tags[]"];
    const tagsArray =
      Array.isArray(tags) && tags.length > 0 ? tags : tags ? [tags] : [];
    if (tagsArray?.length > 0) {
      habitQuery = habitQuery.where("tags", "array-contains-any", tagsArray);
    }

    habitQuery = habitQuery.orderBy(HABIT_FIELD.CREATED_AT, "desc");

    const totalSize = await (await habitQuery.get()).size;

    const pageNumber =
      parseInt(req.query["pageNumber"] as string) || DEFAULT_PAGE_NUMBER;
    const pageSize =
      parseInt(req.query["pageSize"] as string) || DEFAULT_PAGE_SIZE;

    if (pageNumber > 1) {
      const offset = (pageNumber - 1) * pageSize;
      const skipSnapshot = await habitQuery.limit(offset).get();
      if (!skipSnapshot.empty) {
        const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
        habitQuery = habitQuery.startAfter(lastDoc);
      }
    }

    const hasMore = totalSize > pageNumber * pageSize;

    const habitRef = await habitQuery.limit(pageSize).get();

    const habitList: HabitType[] = habitRef.docs.map((x) => {
      const { taskTitle, notes, difficultyId, createdAt, tags } = x.data();
      return {
        taskTitle,
        notes,
        difficultyId,
        tags,
        createdAt: createdAt.toDate().toISOString(),
        id: x.id,
      };
    });

    const pagination = { pageSize, pageNumber, hasMore, totalSize };

    res
      .status(OK_SUCCESS_STATUS_CODE)
      .json({ message: SUCCESS_MESSAGE, habitList, pagination });
    return;
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({
      ...GENERIC_HABIT_LISTING_ERROR_RESPONSE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
    return;
  }
}

export default handler;
