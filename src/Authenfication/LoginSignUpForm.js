import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const LoginSignUpForm = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image
          style={styles.iHealthLogo}
          source={require("../../assets/Logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>Let's get started!</Text>
        <Text style={styles.subtitle}>
          Login to enjoy the features we've provided, and stay healthy!
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <View style={styles.buttonTextSignContainer}>
            <Text style={styles.buttonTextSign}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iHealthLogo: {
    marginTop: -100,
    width: 2000,
    height: 300,
    marginBottom: -35,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iHealthText: {
    fontWeight: "bold",
    color: "#209F84",
    fontSize: 27,
    textAlign: "center",
    lineHeight: 100,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    color: "#717784",
    textAlign: "center",
    marginBottom: 40,
    marginLeft: 39,
    marginRight: 32,
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    width: 263,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: "white",
    borderRadius: 32,
    width: 263,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    color: "#199A8E",
  },

  buttonTextLogin: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSignContainer: {
    borderWidth: 2,
    borderColor: "#199A8E",
    borderRadius: 32,
    width: 263,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
  },
  buttonTextSign: {
    color: "#199A8E",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default LoginSignUpForm;
