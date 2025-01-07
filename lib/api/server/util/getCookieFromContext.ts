import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

/**
 * extract cookie in context, useful for getServerSideProps calling API externally passing cookie
 * @param context context in getServerSideProps
 * @returns
 */
export const getCookieFromContext = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => context.req.headers.cookie;
