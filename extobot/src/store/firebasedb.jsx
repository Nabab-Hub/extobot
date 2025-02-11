import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const FirebaseContext = createContext()

export const FirebaseProvider = ({children}) => {

    const firebaseConfig = {
            apiKey: import.meta.env.GOOGLE_API_KEY ,
            authDomain: import.meta.env.AUTH_DOMAIN,
            projectId: "examautobot",
            storageBucket: import.meta.env.STORAGE_BUCKET,
            messagingSenderId: import.meta.env.MSG_ID,
            appId: import.meta.env.APP_ID,
            measurementId: import.meta.env.MEASURE_ID,
            databaseURL: import.meta.env.DATABASE_URL,
        };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);


    return <FirebaseContext.Provider value={{database}}>
        {children}
    </FirebaseContext.Provider>
}

export const useFirebase = () => {
    const firebaseContextValue = useContext(FirebaseContext)
    if(!firebaseContextValue){
        throw new Error('useFirebase used outside of the Provider')
    }
    return firebaseContextValue
}