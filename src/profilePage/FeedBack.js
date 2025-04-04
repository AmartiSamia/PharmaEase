import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import BottomProfil from "../bottomProfilPage.js";
const FeedBack = ({ navigation }) => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  // Handlers for input changes
  const handleNameChange = (text) => {
    setValidName(text.length >= 3 && /^[A-Z]/.test(text));
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

  const handleCommentChange = (text) => {
    setComment(text);
  };

  // Handle star rating press
  const handleStarPress = (index) => {
    setRating(index + 1);
  };
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

      headerTitle: "Give Feedback",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        height: 100,
        borderBottomWidth: 0,
        backgroundColor: "white",
      },
    });
  }, [navigation]);
  // Render star icons based on rating state
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let source;
      if (i < rating) {
        source =
          i === rating - 1
            ? require("../../assets/Stars/starChosen.png")
            : require("../../assets/Stars/starFull.png");
      } else {
        source = require("../../assets/Stars/StarEmpty.png");
      }
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Image source={source} style={styles.star} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Submit feedback function
  const submit = () => {
    const insertAPIURL = "http://192.168.8.101/api/feedbackP.php"; // Update with your server URL
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Prepare data object to send
    const data = {
      name: name,
      email: email,
      rating: rating,
      commentaire: comment,
    };

    // Perform the fetch request
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
        console.log("Success response:", data);
        setSuccessMessage(data.message); // Set success message state
        Alert.alert(
          "Success",
          "Your feedback has been successfully submitted",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred, please try again later.");
      });
  };

  // Render function
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Name input */}
        <Text style={styles.label}>Name</Text>
        <View
          style={[styles.inputContainer, nameFocused && styles.inputFocused]}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Authentification/User.png")}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.input, nameFocused && styles.inputFocusedText]}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Enter your name"
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
        </View>

        {/* Email input */}
        <Text style={styles.label}>Email address</Text>
        <View
          style={[styles.inputContainer, emailFocused && styles.inputFocused]}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Authentification/email.png")}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.input, emailFocused && styles.inputFocusedText]}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        {/* Rating selection */}
        <Text style={styles.label}>Share your experience in scaling</Text>
        <View style={styles.rating}>{renderStars()}</View>

        {/* Comment input */}
        <Text style={styles.label}>Add your comment here</Text>
        <View style={styles.commentContainer}>
          <Image
            style={[
              styles.icon,
              { marginLeft: 5, marginTop: 10, marginRight: 3 },
            ]}
            source={require("../../assets/Profile/Comment.png")}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.input, styles.commentInput]}
            value={comment}
            onChangeText={handleCommentChange}
            placeholder="Add Comment"
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>

        {/* Success message */}
        <View style={styles.successMessageContainer}>
          {successMessage && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
        </View>
      </ScrollView>

      <BottomProfil />
    </View>
  );
};

// Styles for FeedBack component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 28,
    height: 57,
    borderWidth: 3,
    borderColor: "#E5E7EB",
    marginHorizontal: 25,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 60, // Adjust this value to accommodate the bottom profile bar
  },
  inputFocused: {
    borderColor: "#51BCB2", // Change border color when focused
  },
  inputFocusedText: {
    fontWeight: "600", // Change font weight when focused
  },
  commentContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 28,
    height: 200,
    borderWidth: 3,
    borderColor: "#E5E7EB",
    marginHorizontal: 25,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  commentInput: {
    height: "100%", // Make sure the TextInput takes up the full height of its container
    marginTop: 10,
  },
  label: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 25,
    marginLeft: 35,
  },
  rating: {
    marginTop: 19,
    marginLeft: 75,
    marginRight: 19,
    flexDirection: "row",
  },
  star: {
    width: 50,
    height: 50,
  },
  submitButton: {
    marginLeft: 270,
    backgroundColor: "#209F84",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 25,
    height: 33,
    width: 113,
  },
  buttonTextSubmit: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  successMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
  },
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 8,
  },
});

export default FeedBack;
