import type { NextApiRequest, NextApiResponse } from "next";
import { hashText } from "lib/auth/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import { USERS_COLLECTION, EMAIL_FIELD } from "lib/firebase/constant";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method == "POST") {
    const data = req.body;

    const { email, password } = data;

    //email and password format validation
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = emailRegex.test(String(email).toLowerCase());
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const passwordResult = passwordRegex.test(String(password));
    if (!emailResult || !passwordResult) {
      res.status(422).json({ message: "request parameters are invalid" });
      return;
    }

    var hashedPassword = await hashText(password);

    // user validation to check if user provided email has been signed up before
    const usersRef = firebase.firestore().collection(USERS_COLLECTION);
    const snapshot = await usersRef
      .where(EMAIL_FIELD, "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      const result = await usersRef.add({
        email,
        password: hashedPassword,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });

      res.status(201).json({ message: "created user " + result.id });
      return;
    }

    res.status(422).json({ message: "user has been signed up before" });
    return;
  }

  return res.status(400).end();

  // add error handling
}

export default handler;
