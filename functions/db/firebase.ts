import dotenv from "dotenv";

dotenv.config();
// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: `https://${process.env.DATABASE_NAME}.firebasedatabase.app`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: `G-${process.env.MEASUREMENT_ID}`,
};

export default firebaseConfig;
