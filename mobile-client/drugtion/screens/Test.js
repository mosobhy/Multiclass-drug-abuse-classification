import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import DeviceStorage from "../DeviceStorage";

const Test = (props) => {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <TouchableOpacity
        style={{ marginBottom: 100 }}
        onPress={() => {
          return DeviceStorage.saveItem("token", "fucking crazy");
        }}
      >
        <Text>setItem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 100 }}
        onPress={() => {
          return DeviceStorage.getItem("token");
        }}
      >
        <Text>getItem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          return DeviceStorage.removeItem("token");
        }}
      >
        <Text>removeItem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
