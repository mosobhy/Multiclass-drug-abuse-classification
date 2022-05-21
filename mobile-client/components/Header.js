import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  //const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation();

  const moveToHome = () => {
    navigation.navigate("Home");
  };
  const moveToResults = () => {
    navigation.navigate("Results");
  };
  const logOut = () => {
    console.log("logged out");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={moveToHome}>
        <FontAwesome name="home" size={30} color={Colors.active} />
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Feather name="log-out" size={30} color={Colors.inActive} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: hp("2%"),
    paddingVertical: hp("2%"),
  },
});
export default Header;
