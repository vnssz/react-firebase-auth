import { auth } from "../firebase";
import { onAuthStateChanged,signOut ,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import React, {useEffect,useState} from "react";

const useAuth = () => {
   const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
 
}
 
export default useAuth;

// export function signup(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

// export function login(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

export function logout() {
  return signOut(auth);
}