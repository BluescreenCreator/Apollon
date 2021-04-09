import 'firebase/firestore';
import 'firebase/auth';

(function() {

    //initilize Firebase
    const config = {
    apiKey: "AIzaSyCAf1IK82QhYaxxK0mdbMjkSUnlb-gzxhc",
    authDomain: "apollon-da74a.firebaseapp.com",
    projectId: "apollon-da74a",
    storageBucket: "apollon-da74a.appspot.com",
    messagingSenderId: "864434871892",
    appId: "1:864434871892:web:26bb2b258c0ad5805d17c1"
    };
    firebase.initializeApp(config);

    // Get elements
    const signUptxtEmail = document.getElementById('registeremail');
    const signUptxtPassowrd = document.getElementById('registerpw');
    const signUpButton = document.getElementById('CreateAccountButton');
    const logintxtEmail = document.getElementById('loginemail');
    const logintxtPassword = document.getElementById('loginpw');
    const loginButton = document.getElementById('loginButton');

    // Add login event
    loginButton.addEventListener('click', e=> {
        // Get email and password
        const email = logintxtEmail.value;
        const password = logintxtPassword.value;
        const auth = firebase.auth();
        // Sign in
        auth.signInWithEmailAndPassword(email, password);
        Promise.catch(e => console.log(e.message));
    });

    // Add signup event
    signUpButton.addEventListener('click', e=> {
        // Get email and password
        const email = signUptxtEmail.value
        const password = signUptxtPassowrd.value;
        const auth = firebase.auth();
        // Sign in
        auth.createUserWithEmailAndPassword(email, password);
        Promise.catch(e => console.log(e.message));
    });

    // authentification Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        }
        else {
            console.log("not logged in");
        }
    })
}());