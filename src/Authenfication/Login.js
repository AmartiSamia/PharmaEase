import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Button,
  Image,
  SafeAreaView,
} from "react-native";

const LoginForm = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/Header/Back.png")}
            style={{ width: 25, height: 25, marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
      headerTitle: "Login",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
        height: 90,
        borderBottomWidth: 0,
      },
    });
  }, [navigation]);

  const handleBack = () => {
    navigation.navigate("LoginSignUpForm");
  };
  const handleOpeningPage = () => {
    navigation.navigate("OpeningPage");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);

  const validateEmail = (email) => {
    // Expression régulière pour valider le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const renderEmailIcon = () => {
    if (validateEmail(email)) {
      return (
        <Image
          style={styles.icon}
          source={require("../../assets/Authentification/emailValid.png")}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Image
          style={styles.icon}
          source={require("../../assets/Authentification/email.png")}
          resizeMode="contain"
        />
      );
    }
  };

  const renderEmailCheckIcon = () => {
    if (validateEmail(email)) {
      return (
        <Image
          style={styles.valid}
          source={require("../../assets/Authentification/Check.png")}
          resizeMode="contain"
        />
      );
    } else {
      return null;
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password?");
  };

  const handleLogin = () => {
    var SearchAPIURL = "http://192.168.8.101/api/search.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json", // This is important for sending JSON data
    };
    var Data = {
      email: email,
      password: password,
    };
    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Login response:", response);
        if (response && Object.keys(response).length > 0) {
          Alert.alert("Success", "Login successful");
          setTimeout(() => {
            handleOpeningPage();
          }, 1500);
        } else {
          setValidPassword(false);
          setTimeout(() => {
            setValidPassword(true);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const a = () => {
    console.log(email, password);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container1}>
        {renderEmailIcon()}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        {renderEmailCheckIcon()}
      </View>
      <View
        style={!validPassword ? styles.container2Invalid : styles.container2}
      >
        <Image
          style={styles.icon}
          source={
            !validPassword
              ? require("../../assets/Authentification/LockInvalid.png")
              : password && password.length > 4
              ? require("../../assets/Authentification/LockValid.png")
              : require("../../assets/Authentification/Lock.png")
          }
          resizeMode="contain"
        />

        <TextInput
          style={!validPassword ? styles.inputInvalid : styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            style={styles.icon}
            source={require("../../assets/Authentification/See.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {!validPassword && (
        <Text
          style={{
            marginTop: 10,
            fontWeight: "500",
            fontSize: 13,
            color: "#FF5C5C",
            marginLeft: 35,
          }}
        >
          {" "}
          *The password or email you entered is wrong{" "}
        </Text>
      )}
      <View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            handleLogin();
            a();
          }}
        >
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.Account}>
        {" "}
        Don’t have an account ?{" "}
        <Text style={styles.SignUp} onPress={handleSignUp}>
          Sign Up
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#F9FAFB",
    borderRadius: 28,
    color: "#A1A8B0",
    height: 57,
    width: 360,
    borderWidth: 1,
    marginBottom: 0,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
  },
  container2: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#F9FAFB",
    borderRadius: 28,
    color: "#A1A8B0",
    height: 57,
    width: 360,
    borderWidth: 1,
    marginBottom: 0,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
  },
  container2Invalid: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#F9FAFB",
    borderRadius: 28,
    color: "#A1A8B0",
    height: 57,
    width: 360,
    borderWidth: 1,
    marginBottom: 0,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
    borderColor: "red", // Bordure rouge pour indiquer l'invalidité
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },

  input: {
    flex: 1,
    width: 10,
    height: 40,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  inputInvalid: {
    flex: 1,
    width: 10,
    height: 40,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 16,
    borderColor: "red", // Bordure rouge pour indiquer l'invalidité
  },
  buttonTextLogin: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  valid: {
    width: 25,
    height: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 45,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    height: 57,
    width: 360,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  Account: {
    marginTop: 20,
    textAlign: "center",
    color: "#717784",
    fontWeight: "500",
    fontSize: 15,
  },
  SignUp: {
    marginTop: 20,
    textAlign: "center",
    color: "#199A8E",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default LoginForm;
