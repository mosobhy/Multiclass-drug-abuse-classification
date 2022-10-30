import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../components/Header";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
const AnlyticsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Image
        source={require("../assets/imgs/Analytics.png")}
        style={styles.image}
      />
      <View style={styles.analysis}>
        <Text style={styles.analysisText}>
          Area: <Text style={styles.analysisResult}> {item.Area}</Text>{" "}
        </Text>
        <Text style={styles.analysisText}>
          Reported Cases:{" "}
          <Text style={styles.analysisResult}> {item.ReportedCases}</Text>{" "}
        </Text>
        <Text style={styles.analysisText}>Substance:</Text>
        <View style={styles.progress}>
          <View>
            <Text style={styles.progressText}>Alcohol:</Text>
            <Progress.Bar
              progress={item.substance.Alcohol / 100}
              style={styles.progressBar}
              color={Colors.primary}
              width={wp("85%")}
              borderColor={Colors.accent}
              unfilledColor={Colors.light}
            />
            <Text style={[styles.progressText, { textAlign: "right" }]}>
              {item.substance.Alcohol}%
            </Text>
          </View>
          {/* *************************************  */}
          <View>
            <Text style={styles.progressText}>Ecstasy:</Text>
            <Progress.Bar
              progress={item.substance.Ecstasy / 100}
              style={styles.progressBar}
              color={Colors.primary}
              width={wp("85%")}
              borderColor={Colors.accent}
              unfilledColor={Colors.light}
            />
            <Text style={[styles.progressText, { textAlign: "right" }]}>
              {item.substance.Ecstasy}%
            </Text>
          </View>
          {/* *************************************  */}

          <View>
            <Text style={styles.progressText}>BDZ:</Text>
            <Progress.Bar
              progress={item.substance.BDZ / 100}
              style={styles.progressBar}
              color={Colors.primary}
              width={wp("85%")}
              borderColor={Colors.accent}
              unfilledColor={Colors.light}
            />
            <Text style={[styles.progressText, { textAlign: "right" }]}>
              {item.substance.BDZ}%
            </Text>
          </View>
          {/* *************************************  */}

          <Text style={styles.progressText}>OS:</Text>
          <Progress.Bar
            progress={item.substance.OS / 100}
            style={styles.progressBar}
            color={Colors.primary}
            width={wp("85%")}
            borderColor={Colors.accent}
            unfilledColor={Colors.light}
          />
          <Text style={[styles.progressText, { textAlign: "right" }]}>
            {item.substance.OS}%
          </Text>
          {/* *************************************  */}
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <Header />
      </View>
    </View>
  );
};
styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: wp("10%"),
    backgroundColor: Colors.accent,
  },
  title: {
    fontSize: wp("10%"),
    fontWeight: "bold",
    color: Colors.primary,
    textShadowColor: Colors.light,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  image: {
    width: wp("90%"),
    marginTop: hp("2%"),
  },
  analysis: {
    width: wp("100%"),
    padding: wp("2%"),
  },
  analysisText: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Colors.sharp,
    marginTop: hp("2%"),
    textShadowColor: Colors.light,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  analysisResult: {
    color: Colors.primary,
    textShadowColor: Colors.light,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  progress: {
    padding: wp("4%"),
  },
  progressText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: Colors.primary,
  },
  progressBar: {
    marginTop: hp("2%"),
  },
});
export default AnlyticsScreen;
