import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCajm5MaZqeUzvxYyhNmltVvlG0qzaYPrA",
    authDomain: "crwn-db-f8fbd.firebaseapp.com",
    projectId: "crwn-db-f8fbd",
    storageBucket: "crwn-db-f8fbd.appspot.com",
    messagingSenderId: "294289074587",
    appId: "1:294289074587:web:66e3bef23302e9d21e193e",
    measurementId: "G-MWLBLESZ85"
}

export const creatUserProfilDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    // console.log(snapshot);

    if (!snapshot.exists){
        const { displayName, email} = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log("error creating user =", error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({ prompt: 'select_account' });
provider.setCustomParameters({ propmt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;