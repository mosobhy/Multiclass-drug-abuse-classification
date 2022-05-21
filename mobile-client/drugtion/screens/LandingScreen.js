import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import OnBoardingScreen from "./OnBoardingScreen";
import LoginScreen from "./LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

// Displays Loading Indicator
const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const LandingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [viewOnBoarding, setViewOnBoarding] = useState(false);

  //Check if user Viewed onboarding screen ...
  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewOnBoarding");
      if (value !== null) {
        setViewOnBoarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Run checkOnBoarding if anything changed
  useEffect(() => {
    checkOnBoarding();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : viewOnBoarding ? (
        <LoginScreen />
      ) : (
        <OnBoardingScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default LandingScreen;
