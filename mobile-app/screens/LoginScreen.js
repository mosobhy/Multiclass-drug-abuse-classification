import React, { useContext, useEffect } from "react";
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
import { LoginContext } from "../Context";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  // Login Form schema
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to be at least 6 characters"),
  });
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const onLogin = async (email, password) => {
    axios
      .post("https://aa9d-197-54-141-173.eu.ngrok.io/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle the JWT response here
        DeviceStorage.saveItem("id_token", response.data.token);
        setLoggedIn(true);
      })
      .catch((error) => {
        // Handle returned errors here
        setLoggedIn(false);
        Alert.alert("OOPS", "This Process has been Failed", [
          ({
            text: "Cancel",
            onPress: () => navigation.navigate("Error"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("Error") }),
        ]);
      });
  };

  if (loggedIn) {
    useEffect(() => {
      onLogin();
    }, [loggedIn]);
  }
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
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            return onLogin(values.email, values.password);
          }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <FormDetails
                title="Log in"
                description="If you don’t have an account register"
                belowDescription="Register here !"
                movingTo="Register"
              />
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
                style={[styles.btn(isValid)]}
                onPress={() => {
                  // handle if the account doesn't exists you will not execute those 👉
                  handleSubmit();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: hp("2.1%"),
                  }}
                >
                  Login
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
  }),
});

export default LoginScreen;
