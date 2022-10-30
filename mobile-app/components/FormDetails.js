import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const FormDetails = ({ title, description, belowDescription, movingTo }) => {
  const navigation = useNavigation();

  const moveToLoginRegister = () => {
    navigation.navigate(movingTo);
  };
  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/logo.png")} style={styles.logo} />
      <View style={{ textAlign: "left", width: wp("70%") }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={moveToLoginRegister}>
          <Text style={styles.movingTo}>{belowDescription}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("5%"),
  },
  logo: {
    width: 211,
    maxWidth: "90%",
    height: 202,
    justifyContent: "center",
    marginBottom: "5%",
  },
  title: {
    fontSize: hp("4%"),
  },
  description: {
    fontSize: hp("2%"),
    marginTop: 5,
  },
  movingTo: {
    color: Colors.primary,
  },
});

export default FormDetails;
