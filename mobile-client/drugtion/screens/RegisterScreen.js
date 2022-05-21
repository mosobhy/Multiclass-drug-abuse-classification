import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import FormDetails from "../components/FormDetails";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import DeviceStorage from "../DeviceStorage";

const RegisterScreen = ({ navigation }) => {
  // Register Form schema
  const RegisterFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to be at least 6 characters"),
  });

  const onRegister = async (email, password, username) => {
    // let BaseURL;
    // axios
    //   .post(BaseURL + "/sign_up", {
    //     user: {
    //       username: username,
    //       email: email,
    //       password: password,
    //     },
    //   })
    //   .then((response) => {
    //     // Handle the JWT response here
    //    await DeviceStorage.saveItem("id_token", response.data.jwt);
    //   })
    //   .catch((error) => {
    //     // Handle returned errors here
    //   });

    await DeviceStorage.saveItem("fsdfdsf", username);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={(values) => {
            onRegister(values.email, values.password, values.username);
          }}
          validationSchema={RegisterFormSchema}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <FormDetails
                title="Register"
                description="If you don’t have an account register"
                belowDescription="Log in !"
                movingTo="Login"
              />
              <View
                style={[
                  styles.input,
                  {
                    borderColor:
                      1 > values.username.length || values.username.length >= 2
                        ? Colors.primary
                        : "red",
                  },
                ]}
              >
                <TextInput
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder="Create User name"
                  placeholderTextColor={Colors.primary}
                  textContentType="username"
                  autofocus={true}
                />
              </View>
              <View
                style={[
                  styles.input,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? Colors.primary
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Enter Email"
                  placeholderTextColor={Colors.primary}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autofocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.input,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 6
                        ? Colors.primary
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={Colors.primary}
                  textContentType="password"
                  autofocus={true}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              <TouchableOpacity
                style={styles.btn(isValid)}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: hp("2.1%"),
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: "4%",
    paddingTop: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: hp("6%"),
    width: wp("70%"),
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
  },
  btn: (isValid) => ({
    height: hp("6%"),
    width: wp("70%"),
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: isValid ? Colors.primary : Colors.light,
    backgroundColor: isValid ? Colors.primary : Colors.light,
    fontWeight: "bold",
  }),
});

export default RegisterScreen;

//import AsyncStorage from "@react-native-async-storage/async-storage";
// <TouchableOpacity onPress={clearOnboarding}>
//   <Text>Clear onboarding</Text>
// </TouchableOpacity>

/* ----------------


const clearOnboarding = async () => {
  try {
    // remove this item from storage
    await AsyncStorage.removeItem("@viewOnBoarding");
  } catch (err) {
    console.log("Error @clearOnboarding: ", err);
  }
};


*/
