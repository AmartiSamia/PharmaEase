import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomNavigationBar = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate("OpeningPage");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.bottomNavigationBar}>
      <TouchableOpacity onPress={handleHome}>
        <Image
          style={styles.icon}
          source={require(".././assets/ProfilBottom/Home.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfile}>
        <Image
          style={styles.icon}
          source={require(".././assets/ProfilBottom/Prof.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigationBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigationBar;
