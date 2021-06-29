import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION } from "lib/firebase/constant";
import {
  POST,
  BAD_RERQUEST_STATUS_CODE,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
  VALIDATION_ERROR_MESSAGE,
  UNAUTHORIZED_STATUS_CODE,
  AUTHENTICATION_ERROR_MESSAGE,
  CREATED_SUCCESS_STATUS_CODE,
  CREATE_HABIT_SUCCSS_MESSAGE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  METHOD_NOT_ALLOW_ERROR_MESSAGE,
} from "lib/api/server/constant";
import { getSession } from "next-auth/client";
import { HabitType, HabitDbRecordType } from "lib/types/habit.types";
import { GeneralResponse } from "lib/types/common/data.types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneralResponse>
) {
  try {
    if (req.method != POST) {
      res
        .status(BAD_RERQUEST_STATUS_CODE)
        .json({ message: METHOD_NOT_ALLOW_ERROR_MESSAGE });
      return;
    }

    var response: GeneralResponse;

    // authentication
    const session = await getSession({ req });
    if (!session) {
      response = { message: AUTHENTICATION_ERROR_MESSAGE };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    const data = req.body as HabitType;

    const { taskTitle, notes, difficultyId } = data;

    const userId = (session.id as string) || session.user?.email || "";

    //input validation
    if (!taskTitle || !difficultyId) {
      response = { message: VALIDATION_ERROR_MESSAGE };
      res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
      return;
    }

    // add the db record
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);

    var userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      var user = userSnapshot.data();
      var habits: HabitDbRecordType[] | undefined = user?.habits;
      const habitData = {
        ...data,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      // if habit list is existing, append new habit record. else initiaze new list before appending the recored
      if (habits) {
        habits.push(habitData);
      } else {
        habits = new Array();
        habits.push(habitData);
      }
      await userRef.set({ habits }, { merge: true });
      res
        .status(CREATED_SUCCESS_STATUS_CODE)
        .json({ message: CREATE_HABIT_SUCCSS_MESSAGE });
      return;
    } else {
      response = { message: VALIDATION_ERROR_MESSAGE };
      res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
      return;
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    return;
  }
}

export default handler;
