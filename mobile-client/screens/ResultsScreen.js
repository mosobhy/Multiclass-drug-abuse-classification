import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import Header from "../components/Header";

const ResultsScreen = ({ route, navigation }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/logo.png")} style={styles.logo} />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View style={styles.homeSection}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.text, styles.title]}>The Results</Text>
            {!image ? (
              <Text style={[styles.text, styles.description]}>
                There is on results yet !!
              </Text>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: hp("2.5%"),
                    textAlign: "center",
                    padding: wp("4%"),
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam
                </Text>
              </View>
            )}
          </View>
        </View>
        <Header />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light,
    paddingTop: hp("6%"),
  },
  logo: {
    width: 211,
    maxWidth: "90%",
  },
  homeSection: {
    width: "100%",
    backgroundColor: "#fff",
    height: hp("60%"),
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  text: {
    textAlign: "center",
    color: Colors.primary,
    paddingHorizontal: wp("4%"),
  },
  title: {
    fontSize: hp("5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: hp("2%"),
    marginBottom: hp("1%"),
    fontWeight: "400",
    color: Colors.light,
  },
  image: {
    width: wp("50%"),
    height: hp("25%"),
    borderRadius: 100,
  },
});

export default ResultsScreen;
