// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDGLl6JbfihVyvnt4q3LA-fZ2U4MvFcibc',
    authDomain: 'edupopsvuong-85eb9.firebaseapp.com',
    databaseURL:
        'https://edupopsvuong-85eb9-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'edupopsvuong-85eb9',
    storageBucket: 'edupopsvuong-85eb9.appspot.com',
    messagingSenderId: '571387175015',
    appId: '1:571387175015:web:fabf51b6e52c6ba870b4c2',
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
