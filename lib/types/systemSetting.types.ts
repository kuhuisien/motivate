import { GeneralResponse } from "./common/data.types";

export type SystemSetting = {
  category: string | null;
  code: string | null;
  displayValue: string | null;
  image: string | null;
  value: number;
};

// SystemSetting Listing Response returned by API
export type SystemSettingListingResponseType = GeneralResponse & {
  systemSettings: SystemSetting[];
};

export type GetSystemSettingRequestType = {
  category: string | null;
};
