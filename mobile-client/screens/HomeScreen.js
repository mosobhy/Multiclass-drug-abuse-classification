import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
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

const HomeScreen = () => {
  const [pickedImagePath, setPickedImagePath] = useState("");

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };
  const navigation = useNavigation();
  const goToResults = () => {
    navigation.navigate("Results", {
      image: pickedImagePath,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  /* ****************************************************************************** */
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.text, styles.title]}>Welcome Ahlam</Text>
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
                  <TouchableOpacity onPress={goToResults}>
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
    color: Colors.primary,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
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
