import firebase from 'firebase/app'
import "firebase/database"
const config = {
    apiKey: 'AIzaSyAqnFUxeyIqq6FJindAytaBQPVNHrj_rUI',
    authDomain: 'paid-network.firebaseapp.com',
    databaseURL: 'https://paid-network.firebaseio.com',
    projectId: 'paid-network',
    storageBucket: 'paidtestmode.appspot.com',
    messagingSenderId: '650322887299'
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const agreementsRef = databaseRef.child("agreements")
export default firebase;