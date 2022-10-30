import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const OnboardingItem = ({ item }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ paddingHorizontal: wp("2%") }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  image: {
    //flex: 0.7,
    width: 211,
    maxWidth: "70%",
    height: 202,
    justifyContent: "center",
    marginBottom: "5%",
    transform: [{ translateY: 50 }],
  },
  title: {
    fontWeight: "800",
    fontSize: wp("9%"),
    marginBottom: 10,
    textAlign: "center",
    color: Colors.primary,
  },
  description: {
    fontSize: wp("4.5%"),
    paddingHorizontal: 64,
    textAlign: "center",
    color: Colors.primary,
  },
});
export default OnboardingItem;
