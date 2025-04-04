import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";

const SignUpForm = ({ navigation }) => {
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
      headerTitle: "Sign Up",
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
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [validName, setValidName] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleNameChange = (text) => {
    if (text.length >= 3 && /^[A-Z]/.test(text)) {
      setValidName(true);
    } else {
      setValidName(false);
    }
    setName(text);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setValidEmail(validateEmail(text));
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  ////////////////////////////////////
  // const handleLogin = () => {
  //   navigation.navigate("Login");
  // };

  const signup = () => {
    if (!isChecked) {
      Alert.alert(
        "Error",
        "Please accept the Terms of Service and Privacy Policy."
      );
      return;
    }

    var insertAPIURL = "http://192.168.8.101/api/insert.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      name: name,
      email: email,
      password: password,
    };

    fetch(insertAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessageVisible(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred, please try again later.");
      });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container1}>
        <Image
          style={styles.icon}
          source={
            validName
              ? require("../../assets/Authentification/UserValid.png")
              : require("../../assets/Authentification/User.png")
          }
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.container2}>
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
      <View style={styles.Accept}>
        <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxClick}>
          {isChecked ? (
            <Image
              source={require("../../assets/Authentification/checkmark.png")}
              style={styles.checkboxIcon}
            />
          ) : (
            <View style={styles.checkbox}></View>
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 15 }}>
          I agree to the medidoc{" "}
          <Text style={styles.span}>Terms of Service </Text>and{" "}
          <Text style={styles.span}> Privacy Policy </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={signup}>
        <Text style={styles.buttonTextSignUp}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.Question}>
        {" "}
        You already have an Account !{" "}
        <Text style={styles.Login} onPress={handleLogin}>
          Login
        </Text>{" "}
      </Text>
      <View style={styles.successMessageContainer}>
        {successMessage && (
          <Text style={styles.successMessage}>
            Your account has been seccessufully created
          </Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={successMessageVisible}
        onRequestClose={() => setSuccessMessageVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <View style={modalStyles.successContainer}>
              <Image
                source={require("../../assets/Authentification/Success.png")}
                style={modalStyles.SuccessIcon}
              />
            </View>
            <Text style={modalStyles.title}>Success</Text>
            <Text style={modalStyles.subTitle}>
              Your account has been successfully registered
            </Text>

            <TouchableOpacity
              style={modalStyles.loginButton}
              onPress={() => {
                setSuccessMessageVisible(false);
                handleLogin();
              }}
            >
              <Text style={modalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 24,
    alignItems: "center",
    width: 327,
    height: 401,
    flexDirection: "column",
    alignContent: "center",
  },
  successContainer: {
    top: 50,
    width: 102,
    height: 102,
    backgroundColor: "#F5F8FF",
    borderRadius: 50,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  SuccessIcon: {
    width: 41.75,
    height: 31.79,
  },
  title: {
    paddingTop: 97,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 18,
    color: "#908F8F",
    textAlign: "center",
    lineHeight: 27,
    paddingBottom: 20,
  },
  loginButton: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 56,
    width: 183,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

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

  checkboxIcon: {
    // marginRight: -5,
    width: 16,
    resizeMode: "contain",
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
  span: {
    color: "#199A8E",
  },
  signUpButton: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 45,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    height: 57,
    width: 360,
    marginBottom: -1,
    paddingHorizontal: 10,
  },
  checkbox: {
    borderColor: "#D3D6DA",
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSignUp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  Accept: {
    padding: 2,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginLeft: 25,
    marginRight: 25,
    paddingHorizontal: 10,
  },
  successMessageContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Make the container flex to center its content vertically
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
  },
  valid: {
    width: 25,
    height: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  Question: {
    marginTop: 20,
    textAlign: "center",
    color: "#717784",
    fontWeight: "500",
    fontSize: 15,
  },
  Login: {
    marginTop: 20,
    textAlign: "center",
    color: "#199A8E",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default SignUpForm;
