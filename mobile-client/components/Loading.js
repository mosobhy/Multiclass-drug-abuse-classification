import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
const Loading = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = {
  spinnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

export default Loading;
