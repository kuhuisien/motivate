import { NextApiRequest, NextApiResponse } from "next";
import {
  BAD_RERQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PUT,
  AUTHENTICATION_ERROR_MESSAGE,
  UNAUTHORIZED_STATUS_CODE,
  METHOD_NOT_ALLOW_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
  OK_SUCCESS_STATUS_CODE,
  SUCCESS_MESSAGE,
  DELETE,
} from "lib/api/server/constant";
import { GeneralResponse } from "lib/types/common/data.types";
import { HabitType, HabitDbRecordType } from "lib/types/habit.types";
import { getSession } from "next-auth/client";
import firebase from "firebase";
import { USERS_COLLECTION } from "lib/firebase/constant";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneralResponse>
) {
  try {
    const {
      query: { id },
      method,
    } = req;

    var response: GeneralResponse;

    // authentication
    const session = await getSession({ req });
    if (!session) {
      response = { message: AUTHENTICATION_ERROR_MESSAGE };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    // query parameter validation
    if (!id) {
      response = { message: VALIDATION_ERROR_MESSAGE };
      res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
      return;
    }
    const decodedId = decodeURIComponent(id as string);

    const userId = (session.id as string) || session.user?.email || "";

    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);

    // pre-handling for db record change
    var userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      var user = userSnapshot.data();
      var habits: HabitDbRecordType[] | undefined = user?.habits;
      // return error if respective user does not have any habit record
      if (!habits) {
        response = { message: VALIDATION_ERROR_MESSAGE };
        res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
        return;
      }

      // find the record to be handled
      var habitData = habits.find(
        (h) => h.createdAt.toDate().toISOString() === decodedId
      );

      // return error if requested record to be handled is not found
      if (!habitData) {
        response = { message: VALIDATION_ERROR_MESSAGE };
        res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
        return;
      }

      switch (method) {
        case PUT:
          const data = req.body as HabitType;
          const { taskTitle, notes, difficultyId } = data;

          //input validation
          if (!taskTitle || !difficultyId) {
            response = { message: VALIDATION_ERROR_MESSAGE };
            res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
            return;
          }

          // perform record update
          const updatedHabitData = {
            ...habitData,
            taskTitle,
            notes: notes || null,
            difficultyId,
          };

          const updateIndex = habits.indexOf(habitData);
          habits[updateIndex] = updatedHabitData;

          await userRef.set({ habits }, { merge: true });
          res.status(OK_SUCCESS_STATUS_CODE).json({ message: SUCCESS_MESSAGE });
          return;

        case DELETE:
          // perform record deletion
          var deleteIndex = habits.indexOf(habitData);
          if (deleteIndex !== -1) {
            habits.splice(deleteIndex, 1);
          }

          await userRef.set({ habits }, { merge: true });
          res.status(OK_SUCCESS_STATUS_CODE).json({ message: SUCCESS_MESSAGE });
          return;

        default:
          res
            .status(BAD_RERQUEST_STATUS_CODE)
            .json({ message: METHOD_NOT_ALLOW_ERROR_MESSAGE });
          return;
      }
    } else {
      response = { message: VALIDATION_ERROR_MESSAGE };
      res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    return;
  }
}

export default handler;
