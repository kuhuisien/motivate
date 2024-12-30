import NextAuth from "next-auth";
//import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION } from "lib/firebase/constant";
import { verifyHash } from "lib/auth/auth";
import {
  LOGIN_NO_USER_RECORD_ERROR_MESSAGE,
  LOGIN_INCORRECT_PASSWORD_ERROR_MESSAGE,
} from "lib/api/server/constant";
import { initializeFirebase } from "lib/firebase/setup";
//import { Session } from "inspector";
//import { AdapterUser } from "next-auth/adapters";

initializeFirebase();

export default NextAuth({
  session: {
    // Use JWT for session handling
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password.");
        }

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
        return { email, id: email };
      },
    }),
  ],
  callbacks: {
    // async session({session: Session, user: AdapterUser}) {
    //   //session.id = user.sub;
    //   //return session;
    // },
    // async session({ session, token, user }) {
    //   // Example: Add the user's ID from the token into the session
    //   session.user.id = user.id;
    //   return session;
    // },
  },
});
