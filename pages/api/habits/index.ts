import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION } from "lib/firebase/constant";
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
import { getSession } from "next-auth/react";
import {
  HabitListingResponseType,
  HabitDbRecordType,
  HabitType,
} from "lib/types/habit.types";

const GENERIC_HABIT_LISTING_ERROR_RESPONSE = { habitList: [] };

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

    const session = await getSession({ req });
    if (!session) {
      response = {
        ...GENERIC_HABIT_LISTING_ERROR_RESPONSE,
        message: AUTHENTICATION_ERROR_MESSAGE,
      };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    const userId = (session.id as string) || session.user?.email || "";

    // retrieve db records
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);

    var userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      await userRef.set({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        point: 0,
      });
    }

    var user = userSnapshot.data();

    var habits: HabitDbRecordType[] | undefined = user?.habits;

    // sort the list using createdAt field
    habits?.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
    );

    // convert db type into object type to be returned by API
    const habitsData: HabitType[] =
      habits?.map((h) => {
        return { ...h, createdAt: h.createdAt.toDate().toISOString() };
      }) || [];

    res
      .status(OK_SUCCESS_STATUS_CODE)
      .json({ message: SUCCESS_MESSAGE, habitList: habitsData });
    return;
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      ...GENERIC_HABIT_LISTING_ERROR_RESPONSE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
    return;
  }
}

export default handler;
