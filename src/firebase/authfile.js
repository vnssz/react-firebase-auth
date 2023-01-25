import { auth } from "../firebase";
import { onAuthStateChanged,signOut } from "firebase/auth";
import React, {useEffect,useState} from "react";

 export function useAuth() {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

const Authfile = () => {
   const [loading, setLoading] = useState(false);
 function logOut(){
    return signOut(auth);
}

 async function handleLogout() {
   setLoading(true);
   try {
     await logOut();
   } catch {
     alert("Error!");
   }
   setLoading(false);
 }
    return ( <div>Currently logged in as: { currentUser?.email } </div> );
}
 
export default Authfile ;

