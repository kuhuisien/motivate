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
import { TagListingResponseType } from "lib/types/habit.types";

const GENERIC_TAG_LISTING_RESPONSE = { tagList: [] };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TagListingResponseType>
) {
  try {
    if (req.method != GET) {
      res.status(BAD_RERQUEST_STATUS_CODE).json({
        ...GENERIC_TAG_LISTING_RESPONSE,
        message: METHOD_NOT_ALLOW_ERROR_MESSAGE,
      });
      return;
    }

    var response: TagListingResponseType;

    // authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      response = {
        ...GENERIC_TAG_LISTING_RESPONSE,
        message: AUTHENTICATION_ERROR_MESSAGE,
      };
      res.status(OK_SUCCESS_STATUS_CODE).json(response);
      return;
    }

    const userId = session.user?.email || "";

    // retrieve db records
    var userRef = firebase.firestore().collection(USERS_COLLECTION).doc(userId);
    var userSnapshot = await userRef.get();

    // for handling google signin flow, return empty list
    if (!userSnapshot.exists) {
      response = {
        ...GENERIC_TAG_LISTING_RESPONSE,
        message: SUCCESS_MESSAGE,
      };
      res.status(UNAUTHORIZED_STATUS_CODE).json(response);
      return;
    }

    var habitRef = await firebase
      .firestore()
      .collection(HABITS_COLLECTION)
      .where(HABIT_FIELD.USER_ID, "==", userId)
      .get();

    const tagsSet = new Set<string>();

    habitRef.docs.forEach((x) => {
      const { tags } = x.data();
      if (Array.isArray(tags)) {
        tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    const uniqueTags = Array.from(tagsSet);
    const sortedTags = Array.from(uniqueTags).sort((a, b) =>
      a.localeCompare(b)
    );

    res
      .status(OK_SUCCESS_STATUS_CODE)
      .json({ message: SUCCESS_MESSAGE, tagList: sortedTags });
    return;
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({
      ...GENERIC_TAG_LISTING_RESPONSE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
    return;
  }
}

export default handler;
