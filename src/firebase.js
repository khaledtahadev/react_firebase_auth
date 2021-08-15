import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC9k3Ow_KSemh21PC2K086EYaPfSxBAL-o",
	authDomain: "learning-firebase-7f42c.firebaseapp.com",
	projectId: "learning-firebase-7f42c",
	storageBucket: "learning-firebase-7f42c.appspot.com",
	messagingSenderId: "942597330005",
	appId: "1:942597330005:web:edb5ae5874ef38d28830dc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
