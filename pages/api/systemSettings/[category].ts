import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  SYSTEM_SETTINGS_COLLECTION,
  CATEGORY_FIELD,
} from "lib/firebase/constant";
import {
  BAD_RERQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  GET,
  OK_SUCCESS_STATUS_CODE,
  SUCCESS_MESSAGE,
  METHOD_NOT_ALLOW_ERROR_MESSAGE,
} from "lib/api/server/constant";
import {
  SystemSettingListingResponseType,
  GetSystemSettingRequestType,
  SystemSetting,
} from "lib/types/systemSetting.types";

const GENERIC_SYSTEM_SETTING_LISTING_ERROR_RESPONSE = { systemSettings: [] };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SystemSettingListingResponseType>
) {
  try {
    if (req.method != GET) {
      res.status(BAD_RERQUEST_STATUS_CODE).json({
        ...GENERIC_SYSTEM_SETTING_LISTING_ERROR_RESPONSE,
        message: METHOD_NOT_ALLOW_ERROR_MESSAGE,
      });
      return;
    }

    const data = req.query as GetSystemSettingRequestType;
    const { category } = data;

    var systemSettings: SystemSetting[] = [];

    const systemSetingsRef = firebase
      .firestore()
      .collection(SYSTEM_SETTINGS_COLLECTION);
    const snapshot = await systemSetingsRef
      .where(CATEGORY_FIELD, "==", category)
      .get();

    snapshot.forEach((doc) => {
      var systemSetting = doc.data() as SystemSetting;
      systemSettings.push(systemSetting);
    });

    systemSettings.sort((a, b) =>
      a.value > b.value ? 1 : b.value > a.value ? -1 : 0
    );

    res
      .status(OK_SUCCESS_STATUS_CODE)
      .json({ message: SUCCESS_MESSAGE, systemSettings: systemSettings });
    return;
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      ...GENERIC_SYSTEM_SETTING_LISTING_ERROR_RESPONSE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
    return;
  }
}

export default handler;
