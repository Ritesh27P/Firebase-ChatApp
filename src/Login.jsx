import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./index.css";

const Login = ({setIsLogin, setUser}) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        storeUserInfo(user);
        setIsLogin(true)
        setUser(user.email)
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };

  const loginAnonymously = () => {
    firebase.auth().signInAnonymously()
      .then((userCredential) => {
        // Handle successful anonymous login
        const user = userCredential.user;
        // Proceed with the necessary actions
        console.log(user);
      })
      .catch((error) => {
        // Handle anonymous login error
        console.error(error);
      });
  };
  

  const storeUserInfo = (user) => {
    const userRef = firebase.database().ref('users').child(user.uid);
    userRef.set({
      name: user.displayName,
      email: user.email
      // Store any other relevant information
    });
  };
  

  return (
    // <div className='relative'>
    //   <button className='absolute inset-y-0' onClick={signInWithGoogle}>Sign in with Google</button>
    // </div>
    <div>
        <button onClick={signInWithGoogle}>Login</button>
        {/* <button onClick={loginAnonymously}>Guest Login</button> */}
    </div>
  );
};

export default Login;
