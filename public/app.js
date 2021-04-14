import 'firebase/firestore';
import 'firebase/auth';

//Auth Passowrd

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

//Auth Google

const GoogleSignUpButton = document.getElementById('SignUpWithGoogle');

function googleProvider() {
    // [START auth_google_provider_create]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END auth_google_provider_create]
  
    // [START auth_google_provider_scopes]
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // [END auth_google_provider_scopes]
    
    // [START auth_google_provider_params]
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    // [END auth_google_provider_params]
  }
  
  function googleSignInPopup(provider) {
    // [START auth_google_signin_popup]
    
    GoogleSignUpButton.addEventListener('click', e=> {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // [END auth_google_signin_popup]
    });
  }
  
  
  function googleBuildAndSignIn(id_token) {
    // [START auth_google_build_signin]
    // Build Firebase credential with the Google ID token.
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  
    // Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    // [END auth_google_build_signin]
  }
  
  // [START auth_google_callback]
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
    
        // Sign in with credential from the Google user.
        // [START auth_google_signin_credential]
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        // [END auth_google_signin_credential]
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  // [END auth_google_callback]
  
  // [START auth_google_checksameuser]
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  // [END auth_google_checksameuser]