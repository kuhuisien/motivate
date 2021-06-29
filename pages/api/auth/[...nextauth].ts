import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION } from "lib/firebase/constant";
import { verifyHash } from "lib/auth/auth";
import {
  LOGIN_NO_USER_RECORD_ERROR_MESSAGE,
  LOGIN_INCORRECT_PASSWORD_ERROR_MESSAGE,
} from "lib/api/server/constant";

export default NextAuth({
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    jwt: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      async authorize(credentials: Record<string, string>, req) {
        const { email, password } = credentials;

        // look up user using the credentials supplied
        var userRef = firebase
          .firestore()
          .collection(USERS_COLLECTION)
          .doc(email);

        // check if user has been signed up before
        var userSnapshot = await userRef.get();
        if (!userSnapshot.exists) {
          throw new Error(LOGIN_NO_USER_RECORD_ERROR_MESSAGE);
        }

        // check if user entered password is correct
        var user = userSnapshot.data();
        // get the hashed password from db
        const hashedPassword = user?.password;
        // using util function to compare db hashed password with user entered plain password
        const isValid = await verifyHash(password, hashedPassword);
        if (!isValid) {
          throw new Error(LOGIN_INCORRECT_PASSWORD_ERROR_MESSAGE);
        }

        // Any object returned will be saved in `user` property of the JWT
        return { email };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.id = user.sub;
      return session;
    },
  },
});
