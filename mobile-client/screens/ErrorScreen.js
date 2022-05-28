import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import { LoginContext } from "../Context";
import { useNavigation } from "@react-navigation/native";

const ErrorScreen = () => {
  const navigation = useNavigation();
  // check the logged in state : true => error (Home) ? false => error (Login)
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const goToHome = () => {
    navigation.navigate("Home");
  };

  let navigationDestination;
  if (loggedIn) {
    navigationDestination = goToHome;
  } else {
    navigationDestination = goToLogin;
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/error.png")} style={styles.logo} />
      <View style={styles.caption}>
        <Text style={styles.title}>OOPS !!</Text>
        <Text style={styles.subTitle}>SOMETHING WENT WRONG </Text>
        <TouchableOpacity style={[styles.btn]} onPress={navigationDestination}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.accent,
  },
  logo: {
    width: wp("100%"),
    height: hp("40%"),
    transform: [{ translateX: wp("3%") }],
  },
  title: {
    color: Colors.primary,
    fontSize: wp("10%"),
    fontWeight: "bold",
    marginTop: hp("5%"),
    marginBottom: hp("2%"),
  },
  subTitle: {
    color: Colors.light,
    fontSize: wp("5%"),
  },
  caption: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: hp("3%"),
    color: "white",
    borderRadius: 8,
    width: wp("50%"),
    marginTop: hp("4%"),
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
});
