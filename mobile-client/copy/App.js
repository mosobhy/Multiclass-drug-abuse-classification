import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import HomeScreen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "./constants/Colors";

// Displays Loading Indicator
const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewOnBoarding, setViewOnBoarding] = useState(false);

  // Check if user Viewed onboarding screen ...
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
        <HomeScreen />
      ) : (
        <OnBoardingScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
