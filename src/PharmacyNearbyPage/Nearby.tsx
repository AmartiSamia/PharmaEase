import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import ListingMaps from "./ListingMaps";
import { SafeAreaView } from "react-native-safe-area-context";

const Nearby = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState("");
  const handleInputChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <View>
      <ListingMaps searchText={searchText} />

      <View style={styles.barContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/Header/Back.png")}
              style={{ width: 25, height: 25, marginLeft: -5, marginTop: 29 }}
            />
          </TouchableOpacity>
          <SafeAreaView style={styles.bar}>
            <Image
              source={require("../../assets/Search.png")}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search pharmacy..."
              placeholderTextColor="#ADADAD"
              onChangeText={handleInputChange}
              value={searchText}
            ></TextInput>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center", // Center items horizontally
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    borderWidth: 1,

    borderRadius: 40,
    // zIndex: 100,
    top: 20,

    alignItems: "center",
    // flex: 1,

    flexDirection: "row",

    borderColor: "#E8F3F1",

    marginBottom: 10,

    width: 344,
    marginLeft: 10,
    height: 40,
    backgroundColor: "#F9FAFB",
    color: "#ADADAD",
  },
  input: {
    height: 40,
    flex: 1,
    color: "#ADADAD",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonP: {
    height: 50,
    width: 60,
    backgroundColor: "#FFF",
    borderWidth: 1,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
