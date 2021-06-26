import type { NextApiRequest, NextApiResponse } from "next";
import { hashText } from "lib/auth/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION } from "lib/firebase/constant";
import {
  VALIDATION_ERROR_MESSAGE,
  POST,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
  SIGN_UP_ERROR_MESSAGE,
  CREATED_SUCCESS_STATUS_CODE,
  BAD_RERQUEST_STATUS_CODE,
  SIGN_UP_SUCCESS_MESSAGE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from "lib/api/server/constant";
import { GeneralResponse } from "lib/types/data.types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneralResponse>
) {
  try {
    if (req.method !== POST) {
      res.status(BAD_RERQUEST_STATUS_CODE);
      return;
    }

    const data = req.body;

    const { email, password } = data;

    //email and password format validation
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = emailRegex.test(String(email).toLowerCase());
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const passwordResult = passwordRegex.test(String(password));
    if (!emailResult || !passwordResult) {
      res
        .status(UNPROCESSABLE_ENTITY_STATUS_CODE)
        .json({ message: VALIDATION_ERROR_MESSAGE });
      return;
    }

    // user validation to check if user provided email has been signed up before
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(email);
    var userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      res
        .status(UNPROCESSABLE_ENTITY_STATUS_CODE)
        .json({ message: SIGN_UP_ERROR_MESSAGE });
      return;
    } else {
      // store hashed password
      var hashedPassword = await hashText(password);
      await userRef.set({
        password: hashedPassword,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      res
        .status(CREATED_SUCCESS_STATUS_CODE)
        .json({ message: SIGN_UP_SUCCESS_MESSAGE });
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
