import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
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
    formData.append("image_uri", pickedImagePath);
    const jwt = await AsyncStorage.getItem("id_token");
    // setting the headers
    const headers = {
      Authorization: "Bearer " + jwt,
    };

    let BaseURL = "";
    axios({
      method: "POST",
      url: BaseURL,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // response
        //console.log(response.data.title);
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
        }}
      >
        <View style={styles.homeSection}>
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
                  <TouchableOpacity onPress={() => sendData()}>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: hp("2.5%"),
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Go to the results
                    </Text>
                  </TouchableOpacity>
                </Text>
                <Image style={styles.image} source={{ uri: pickedImagePath }} />
              </View>
            )}
          </View>
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
            <TouchableOpacity style={[styles.btn]} onPress={pickImage}>
              <Text style={styles.buttonText}>Choose one</Text>
            </TouchableOpacity>
          </View>
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
    width: "100%",
    backgroundColor: "#fff",
    height: hp("70%"),
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingTop: hp("2%"),
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
    marginBottom: hp("5%"),
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
    marginTop: "1.5%",
  },
});

export default HomeScreen;
