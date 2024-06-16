import "./App.css";
import Page from "./components/Page";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhxwe-fNFpx8uj9-ZvZkNSxLRVbNW3XAs",
  authDomain: "anagrams-426317.firebaseapp.com",
  projectId: "anagrams-426317",
  storageBucket: "anagrams-426317.appspot.com",
  messagingSenderId: "450940532037",
  appId: "1:450940532037:web:687547101087a889fdba2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return <Page />;
}

export default App;
