import { GeneralResponse } from "./common/data.types";

export type Point = {
  point: number;
};

// Point Response returned by API
export type PointResponseType = GeneralResponse & {
  point: number;
  notificationMsg: string | null;
};
