import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase_config";

export const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInUser = async (firstname, surname, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      const userId = response.user.uid;
      console.log(response);
      createUser(userId, firstname, surname, email);
    })
    .catch((error) => {
      loginError(error);
    });
};

export const googleSignin = async () => {
  const provider = new GoogleAuthProvider(auth);
  await signInWithPopup(auth, provider)
    .then((response) => {
      console.log(response);
      // navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      console.error(errorCode);
      console.error(errorMessage);
      console.error(credential);
    });
};

const createUser = async (userId, firstname, surname, email) => {
  const colRef = doc(db, "users", userId);

  await setDoc(colRef, {
    uid: userId,
    firstname: firstname,
    surname: surname,
    email: email,
  })
    .then((response) => {
      navigate("/");
    })
    .catch((error) => {
      loginError(error);
      console.log(error);
    });
};
