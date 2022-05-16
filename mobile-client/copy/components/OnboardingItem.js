import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
const OnboardingItem = ({ item }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    //flex: 0.7,
    justifyContent: "center",
    marginBottom: "5%",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.primary,
  },
  description: {
    fontWeight: "300",
    paddingHorizontal: 64,
    textAlign: "center",
    color: Colors.primary,
  },
});
export default OnboardingItem;
