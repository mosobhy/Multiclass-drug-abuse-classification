import React, { useState, useEffect } from "react";
import { LoggedIn, Auth } from "./Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
const App = () => {
  const [jwt, setJwt] = useState(false);
  const checkAuth = async () => {
    try {
      const value = await AsyncStorage.getItem("fsdfdsf");
      if (value !== null) {
        setJwt(true);
      }
    } catch (err) {
      console.log("AsyncStorage Error:: ", err);
    }
  };
  useEffect(() => {
    checkAuth();
  });
  {
    if (!jwt) {
      return <Auth />;
    } else if (jwt) {
      return <LoggedIn />;
    }
  }
};
export default App;

/*
 */
