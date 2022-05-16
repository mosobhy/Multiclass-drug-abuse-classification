import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScree = () => {
  const clearOnboarding = async () => {
    try {
      // remove this item from storage
      await AsyncStorage.removeItem("@viewOnBoarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };

  return (
    <View>
      <Text>HomeScree</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScree;
