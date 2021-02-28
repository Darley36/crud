import firebase from 'firebase/app'
import 'firebase/firestore'
import { constant } from 'lodash';

const firebaseConfig = {
    apiKey: "AIzaSyDSuZ68VO8mtlz1NX2WSNASQpm6opRnuTs",
    authDomain: "crud-ffe32.firebaseapp.com",
    projectId: "crud-ffe32",
    storageBucket: "crud-ffe32.appspot.com",
    messagingSenderId: "547031709946",
    appId: "1:547031709946:web:12b5df2f9318ec62ee3143"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)