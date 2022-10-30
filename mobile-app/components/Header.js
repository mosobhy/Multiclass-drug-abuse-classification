import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const navigation = useNavigation();

  const moveToHome = () => {
    navigation.navigate("Home");
  };

  const moveToMap = () => {
    navigation.navigate("Maps");
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("id_token");
      //await AsyncStorage.clear();
      setLoggedIn(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={moveToHome}>
        <FontAwesome name="home" size={30} color={Colors.active} />
      </TouchableOpacity>
      <TouchableOpacity onPress={moveToMap}>
        <Feather name="map-pin" size={30} color={Colors.active} />
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Feather name="log-out" size={30} color={Colors.active} />
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
