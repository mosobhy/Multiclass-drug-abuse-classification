import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MapsScreen from "./screens/MapsScreen";
import ResultsScreen from "./screens/ResultsScreen";
import AnlyticsScreen from "./screens/AnlyticsScreen";
import ErrorScreen from "./screens/ErrorScreen";
import Loading from "./components/Loading";

// Don't show the header
const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

// The user have the right (JWT) to access the Authenticated Screens
export const LoggedIn = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Maps" component={MapsScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
      <Stack.Screen name="Anlytics" component={AnlyticsScreen} />
    </Stack.Navigator>
  );
};

// The User isn't Authenticated
export const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={screenOptions}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
};

// The Spinner Component
export const Load = () => {
  return (
    <Stack.Navigator initialRouteName="Loading" screenOptions={screenOptions}>
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
};
