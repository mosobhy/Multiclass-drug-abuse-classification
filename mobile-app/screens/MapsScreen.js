import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { Marker, Callout } from "react-native-maps";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import data from "../data/analyticsData";
import { useNavigation } from "@react-navigation/native";

const MapsScreen = () => {
  const [region, setRegion] = useState({});
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mapTitle}>Location of high drug abuse rate</Text>
        <MapView
          style={styles.map}
          //specify our coordinates.
          initialRegion={{
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          provider="google"
        >
          {data.map((item, index) => (
            <Marker
              onPress={() => {
                navigation.navigate("Anlytics", {
                  item: item,
                });
              }}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              pinColor="red"
            >
              <Callout>
                <Text>{item.Area}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <Header />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  map: {
    width: wp("100%"),
    height: hp("90%"),
    marginTop: hp("2%"),
  },
  mapTitle: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: Colors.primary,
    textShadowColor: Colors.light,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
    textAlign: "center",
  },
});
export default MapsScreen;
