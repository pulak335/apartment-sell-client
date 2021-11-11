import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";
import firebaseInitialize from "../Firebase/firebase.init";

firebaseInitialize();

const useFirebase = () => {

        const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token,setToken] = useState('')

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                //save user info the database
                saveUser(email,name,'POST')

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history?.replace('/');

            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.push(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result?.user;
                saveUser(user.email,user.displayName,'PUT')
                setUser(user)
                setAuthError('');
                const destination = location?.state?.from || '/';
                history.replace(destination);
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                .then(idToken=>setToken(idToken))
                
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])



    useEffect(() => {
        fetch(`https://murmuring-waters-69615.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data=>setAdmin(data.admin))
    }, [user.email])




    const logout = (history) => {
        setIsLoading(true);
      signOut(auth)
        .then(() => {
            history.push('/');
        })
        .catch((error) => {
            // An error happened.
        })
        .finally(() => setIsLoading(false));
    }

    const saveUser = (email,displayName,method) => {
        const user = { email, displayName };
        fetch('https://murmuring-waters-69615.herokuapp.com/users',
            {
            method: method,
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return {
        user,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        admin,
        token
    }
};

export default useFirebase;