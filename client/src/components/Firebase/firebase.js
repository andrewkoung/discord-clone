import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = { 
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measuringId: process.env.REACT_APP_measurementId,
}

class Firebase { 
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    // Real-time DB paths
    user = uid => this.db.ref(`users/${uid}`);
}

export default Firebase;