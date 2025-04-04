import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomProfil from "../bottomProfilPage.js";
const ProfileScreen = ({ navigation }) => {
  const handleFeedback = () => {
    navigation.navigate("FeedBack");
  };
  const handleFAQ = () => {
    navigation.navigate("FAQ");
  };
  const handleLogout = () => {
    navigation.navigate("Logout");
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

      headerTitle: "Profile",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        height: 100,
        borderBottomWidth: 0,
        backgroundColor: "#F5F8FF",
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/Profile/Profil2.png")}
          style={{ width: 150, height: 150, marginLeft: 8 }}
        />
        <Text style={styles.username}>Samia</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleFAQ}>
          <View style={styles.optionIcon}>
            <Image
              source={require("../../assets/Profile/Help.png")}
              style={{ width: 45, height: 45, marginLeft: 8 }}
            />
          </View>
          <Text style={styles.optionText}>FAQ & Support</Text>
          <Icon name="chevron-right" size={35} color="#199A8E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleFeedback}>
          <View style={styles.optionIcon}>
            <Image
              source={require("../../assets/Profile/feedBack.png")}
              style={{ width: 45, height: 45, marginLeft: 8 }}
            />
          </View>
          <Text style={styles.optionText}>Give Feedback</Text>
          <Icon name="chevron-right" size={35} color="#199A8E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <View style={styles.optionIcon}>
            <Image
              source={require("../../assets/Profile/Logout.png")}
              style={{ width: 45, height: 45, marginLeft: 8 }}
            />
          </View>
          <Text style={[styles.optionText, { color: "#FF0000" }]}>Logout</Text>
          <Icon name="chevron-right" size={35} color="#FF0000" />
        </TouchableOpacity>
      </View>

      <BottomProfil />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF", // Set the default background color
    padding: 15,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
  },
  profileIcon: {
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#50555C",
  },
  optionsContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 70,
    borderRadius: 15, // Apply border radius
    backgroundColor: "#fff", // Set white background color
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1, // Allow text to take remaining space
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ProfileScreen;
