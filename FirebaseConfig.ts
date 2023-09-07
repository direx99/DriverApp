import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCIA2WZUFOMwL_TF_gKA2qyAVQYUhF68WM",
    authDomain: "react-native-auth-85c53.firebaseapp.com",
    projectId: "react-native-auth-85c53",
    storageBucket: "react-native-auth-85c53.appspot.com",
    messagingSenderId: "735280611514",
    appId: "1:735280611514:web:3fedf66f41cdb2effa0283"
};



export const  FIREBASE_APP = initializeApp(firebaseConfig)
export const  FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const  FIREBASE_DB = getFirestore(FIREBASE_APP)