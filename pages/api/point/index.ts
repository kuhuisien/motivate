import { NextApiRequest, NextApiResponse } from "next";
import {
  BAD_RERQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  AUTHENTICATION_ERROR_MESSAGE,
  UNAUTHORIZED_STATUS_CODE,
  METHOD_NOT_ALLOW_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
  OK_SUCCESS_STATUS_CODE,
  SUCCESS_MESSAGE,
  GET,
  PUT,
} from "lib/api/server/constant";
import { PointResponseType, Point } from "lib/types/point.types";
import { getSession } from "next-auth/client";
import firebase from "firebase";
import {
  USERS_COLLECTION,
  SYSTEM_SETTINGS_COLLECTION,
  CATEGORY_FIELD,
  VALUE_FIELD,
} from "lib/firebase/constant";
import { SystemSetting } from "lib/types/systemSetting.types";

const GENERIC_POINT_ERROR_RESPONSE = { point: 0, notificationMsg: null };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PointResponseType>
) {
  try {
    const { method } = req;

    var response: PointResponseType;

    // authentication
    const session = await getSession({ req });
    if (!session) {
      response = {
        ...GENERIC_POINT_ERROR_RESPONSE,
        message: AUTHENTICATION_ERROR_MESSAGE,
      };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    // get the user reference in db
    const userId = (session.id as string) || session.user?.email || "";
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);

    var userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      var user = userSnapshot.data();
      // get user current point
      var point: number = user?.point || 0;

      switch (method) {
        case GET:
          // return user current point
          res.status(OK_SUCCESS_STATUS_CODE).json({
            ...GENERIC_POINT_ERROR_RESPONSE,
            message: SUCCESS_MESSAGE,
            point,
          });
          return;

        case PUT:
          const data = req.body as Point;
          const { point: newPoint } = data;

          // update user point
          await userRef.set({ point: newPoint }, { merge: true });

          const systemSetingsRef = firebase
            .firestore()
            .collection(SYSTEM_SETTINGS_COLLECTION);

          // check if the updated point reaches certain predefined target(s)
          const snapshot = await systemSetingsRef
            .where(CATEGORY_FIELD, "==", "POINT")
            .where(VALUE_FIELD, "<=", newPoint)
            .where(VALUE_FIELD, ">", point)
            .orderBy(VALUE_FIELD)
            .get();

          // set notification message if certain predefined target(s) is reached
          var notificationMsgArr: string[] = [];

          snapshot.forEach((doc) => {
            const pointSystemSetting = doc.data() as SystemSetting;
            if (pointSystemSetting.displayValue) {
              notificationMsgArr.push(pointSystemSetting.displayValue);
            }
          });

          res.status(OK_SUCCESS_STATUS_CODE).json({
            ...GENERIC_POINT_ERROR_RESPONSE,
            message: SUCCESS_MESSAGE,
            point: newPoint,
            notificationMsg: notificationMsgArr.join(" "),
          });
          return;

        default:
          res.status(BAD_RERQUEST_STATUS_CODE).json({
            ...GENERIC_POINT_ERROR_RESPONSE,
            message: METHOD_NOT_ALLOW_ERROR_MESSAGE,
          });
          return;
      }
    } else {
      response = {
        ...GENERIC_POINT_ERROR_RESPONSE,
        message: VALIDATION_ERROR_MESSAGE,
      };
      res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json(response);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({
      ...GENERIC_POINT_ERROR_RESPONSE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
    return;
  }
}

export default handler;
