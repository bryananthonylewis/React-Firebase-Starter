import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDHd7EsO1u7RyYCnCZKCaxi_OAqtbpUjJM",
  authDomain: "aim-react-3e33e.firebaseapp.com",
  databaseURL: "https://aim-react-3e33e.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
