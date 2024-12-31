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
import { HabitType } from "lib/types/habit.types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import firebase from "firebase";
import { HABITS_COLLECTION } from "lib/firebase/constant";

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
    const session = await getServerSession(req, res, authOptions);
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

    var habitRef = await firebase
      .firestore()
      .collection(HABITS_COLLECTION)
      .doc(decodedId);

    // pre-handling for db record change
    var habitSnapshot = await habitRef.get();
    if (habitSnapshot.exists) {
      var habitData = habitSnapshot.data();

      // return error if requested record to be handled is not found
      if (!habitData) {
        response = { message: VALIDATION_ERROR_MESSAGE };
        res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
        return;
      }

      switch (method) {
        case PUT:
          const data = req.body as HabitType;
          const { taskTitle, notes, difficultyId, tags } = data;

          // input validation
          if (!taskTitle || !difficultyId) {
            response = { message: VALIDATION_ERROR_MESSAGE };
            res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
            return;
          }

          // perform record update
          await habitRef.set({
            ...habitData,
            taskTitle,
            notes: notes || null,
            difficultyId,
            tags,
          });

          res.status(OK_SUCCESS_STATUS_CODE).json({ message: SUCCESS_MESSAGE });
          return;

        case DELETE:
          await habitRef.delete();
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
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    return;
  }
}

export default handler;
