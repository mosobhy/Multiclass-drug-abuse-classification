import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
//access camera imports
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  // The Form Data
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [address, setAddress] = useState("");
  // Saving the image_uri
  const [pickedImagePath, setPickedImagePath] = useState("");
  // The Model Results
  const [results, setResults] = useState("");

  // Access the camera
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    // Pick up the photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };
  // upload an image from filesystem
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  // ***************** Send the image to the server *****************
  const sendData = async () => {
    const formData = new FormData();
    // set the (key : value) pairs to => (image_uri : pickedImagePath )
    formData.append("image", {
      uri: pickedImagePath,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    formData.append("name", name);
    formData.append("ssn", ssn);
    formData.append("address", address);

    const jwt = await AsyncStorage.getItem("id_token");

    axios
      .post("https://5981-197-54-245-3.eu.ngrok.io/image", {
        headers: {
          "Content-Type": "multipart/form-data",
          x_access_tokens: jwt,
        },
        body: formData,
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        Alert.alert("OOPS", "This Process has been Failed", [
          ({
            text: "Cancel",
            onPress: () => navigation.navigate("Error"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("Error") }),
        ]);
      })
      .finally(() => {
        navigation.navigate("Results", {
          image: pickedImagePath,
          results: results,
        });
      });
  };

  /* ****************************************************************************** */
  return (
    <View style={styles.container}>
      <Image source={require("../assets/imgs/logo.png")} style={styles.logo} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          paddingBottom: "5%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          paddingTop: "5%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.text, styles.title]}>Welcome to Drugtion</Text>
          {!pickedImagePath ? (
            <Text style={[styles.text, styles.description]}>
              No image picked yet
            </Text>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={[
                  styles.text,
                  styles.description,
                  { marginBottom: hp("1%") },
                ]}
              >
                The image was picked successfully!
              </Text>
              <Image style={styles.image} source={{ uri: pickedImagePath }} />
            </View>
          )}
        </View>
        {/* ################################## This Is The Form Data ################################## */}
        <View style={[styles.formData]}>
          <View>
            <TextInput
              style={[styles.buttonText, styles.btn, styles.formBtn]}
              placeholder="Name"
              placeholderTextColor={Colors.light}
              defaultValue={name}
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View>
            <TextInput
              style={[styles.buttonText, styles.btn, styles.formBtn]}
              placeholder="SSN"
              placeholderTextColor={Colors.light}
              defaultValue={ssn}
              onChangeText={(ssn) => setSsn(ssn)}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>
          <View>
            <TextInput
              style={[styles.buttonText, styles.btn, styles.formBtn]}
              placeholder="Address"
              placeholderTextColor={Colors.light}
              defaultValue={address}
              onChangeText={(address) => setAddress(address)}
            />
          </View>
        </View>
        {/* ###################################################### go to results ###################################################### */}
        {pickedImagePath ? (
          <TouchableOpacity
            onPress={() => sendData()}
            style={{
              borderColor: Colors.primary,
              borderWidth: 1,
              backgroundColor: Colors.primary,
              padding: hp("1.5%"),
              marginBottom: hp("1.5%"),
              borderRadius: hp("1%"),
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: hp("2.5%"),
                fontWeight: "bold",
              }}
            >
              {" "}
              Go to the results
            </Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
        {/* ########################### the camera btns ################################## */}
        <View style={styles.btns}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "white",
                borderColor: Colors.primary,
                borderWidth: 1,
              },
            ]}
            onPress={openCamera}
          >
            <Text style={[styles.buttonText, { color: Colors.primary }]}>
              Take a photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "white",
                borderColor: Colors.primary,
                borderWidth: 1,
              },
            ]}
            onPress={pickImage}
          >
            <Text style={[styles.buttonText, { color: Colors.primary }]}>
              Choose one
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0 }}>
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
    marginBottom: hp("1.5%"),
  },
  homeSection: {
    width: wp("100%"),
    backgroundColor: "#fff",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    height: hp("70%"),
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: hp("5%"),
  },
  text: {
    textAlign: "center",
    color: Colors.primary,
    paddingHorizontal: wp("4%"),
  },
  title: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: hp("2%"),
    marginBottom: hp("1%"),
    fontWeight: "400",
    color: Colors.primary,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginHorizontal: hp("1.5%"),
    marginBottom: hp("10%"),
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: hp("3%"),
    color: "white",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  image: {
    width: wp("50%"),
    height: hp("25%"),
    borderRadius: 100,
    marginVertical: "1.5%",
  },
  formData: {
    width: wp("100%"),
  },
  formBtn: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderWidth: 1,
    color: Colors.primary,
    margin: wp("4%"),
  },
});

export default HomeScreen;
