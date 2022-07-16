import React, { useState, useEffect } from "react";
import { LoggedIn, Auth, Load } from "./Navigation";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "./Context";
import { NavigationContainer } from "@react-navigation/native";
const App = () => {
  // Displays Loading Indicator

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is Authenticated or not
  const Authentication = async () => {
    let value;
    try {
      value = await AsyncStorage.getItem("id_token");
      // there is (JWT) => the user is authenticated
      if (value !== null) {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      return value;
    }
  };

  // Call the function every time the (loggedIn) changes
  useEffect(() => {
    Authentication();
  }, [loggedIn]);

  /*
    show loading screen at the time the authentication is checked
    if ( the loading screen is loading... ) {
      show the loading screen
    } else {
      if ( the user is authenticated ) {
        show the home Screen
      } else {
        make him logIn
      }
    }
  */

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        {loading ? <Load /> : !loggedIn ? <Auth /> : <LoggedIn />}
      </NavigationContainer>
    </LoginContext.Provider>
  );
};
export default App;
