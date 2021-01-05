import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1cVkgWg4PBWMVNBFXaATQb0mD6K9-sWg",
  authDomain: "year-exercise-tracker.firebaseapp.com",
  projectId: "year-exercise-tracker",
  storageBucket: "year-exercise-tracker.appspot.com",
  messagingSenderId: "439082655310",
  appId: "1:439082655310:web:f1df972b93d87ba5cfed1f",
  measurementId: "G-9T81FLQFN1",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if no userAuth exit function
  if (!userAuth) return;

  const userRef = firestore.doc(`Users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
const firestore = firebase.firestore();

const twitter = new firebase.auth.TwitterAuthProvider();
twitter.setCustomParameters({
  prompt: "select_account",
});

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signinAnonymously = () => auth.signInAnonymously();

export default firebase;

// Sign in options to include in future

export const signInWithTwitter = () =>
  auth
    .signInWithPopup(twitter)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = credential.accessToken;
      var secret = credential.secret;
      // The email of the user's account used.
      var email = error.email;
      // The signed-in user info.
      var displayName = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

const github = new firebase.auth.GithubAuthProvider();
github.setCustomParameters({ prompt: "select_account" });
export const signInWithGithub = () =>
  auth
    .signInWithPopup(github)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;
      // The email of the user's account used.
      var email = error.email;
      // The signed-in user info.
      var displayName = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
