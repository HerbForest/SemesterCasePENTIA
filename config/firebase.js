// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBkIDsg7bfbpI7ePlFv5ycCop-f_a7R0pY",
	authDomain: "pentiacase-9d786.firebaseapp.com",
	projectId: "pentiacase-9d786",
	storageBucket: "pentiacase-9d786.firebasestorage.app",
	messagingSenderId: "1000455454929",
	appId: "1:1000455454929:web:e15248745ea0b7a96a05f0",
	measurementId: "G-N4GR1KLLHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
