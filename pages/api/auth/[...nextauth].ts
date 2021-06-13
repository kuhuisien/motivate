import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION, EMAIL_FIELD } from "lib/firebase/constant";
import { verifyHash } from "lib/auth/auth";

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

        // look up user form the credentials supplied
        const usersRef = firebase.firestore().collection(USERS_COLLECTION);
        const snapshot = await usersRef.where(EMAIL_FIELD, "==", email).get();

        if (snapshot.empty) {
          throw new Error("No user found");
        }

        // verify user provided password
        const hashedPassword = snapshot.docs.map((doc) => doc.data())[0]
          .password;
        const isValid = await verifyHash(password, hashedPassword);

        if (!isValid) {
          throw new Error("incorrect password");
        }

        // Any object returned will be saved in `user` property of the JWT
        return { email };
      },
    }),
  ],
});
