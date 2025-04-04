import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavigationBar from "../../bottomNavigationBar";
// Import JSON data
import medicinesData from "../../API/Medicines.list.json";
// Import the image mapper
import { imageMapper } from "../../API/MedicineImageMapper";

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setMedicines(medicinesData);
    setSearchResults(medicinesData); // Initially show all medicines
  }, []);

  const handleInputChange = (text) => {
    setSearchQuery(text);
    if (text.trim() !== "") {
      const results = fetchSearchResults(text);
      setSearchResults(results);
    } else {
      setSearchResults(medicines); // If search query is empty, show all medicines
    }
  };

  const fetchSearchResults = (query) => {
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
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
      headerRight: () => (
        <Image
          source={require("../../assets/Header/Medicines.png")}
          style={{ width: 26.5, height: 26.57, marginRight: 30, marginTop: 0 }}
        />
      ),
      headerTitle: "Medicines",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        height: 100,
        borderBottomWidth: 0,
      },
    });
  }, [navigation]);

  const handleMedicinePress = (item) => {
    navigation.navigate("MedicineDetail", { medicine: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.iconSearch}
          source={require("../../assets/Search.png")}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={searchQuery}
          placeholder="Search medicine..."
          placeholderTextColor="#ADADAD"
        />
      </View>
      <FlatList
        style={styles.list}
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMedicinePress(item)}>
            <View style={styles.medicineContainer}>
              <Image
                source={imageMapper[item.Picture]}
                style={styles.medicineImage}
              />
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <View style={styles.pricePcsContainer}>
                  <View style={styles.Price1}>
                    <Text style={styles.medicinePcs}>{item.Pcs}</Text>
                  </View>
                  <Text style={styles.medicinePrice}>{item.Price}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 60, // Adjust this value to accommodate the bottom navigation bar
    backgroundColor: "white",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E8F3F1",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 24,
    width: 374,
    height: 40,
    backgroundColor: "#F9FAFB",
    color: "#ADADAD",
  },
  medicineName: {
    color: "#0C2638",
    fontSize: 16.5,
    fontWeight: "600",
  },
  iconSearch: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    height: 40,
    flex: 1,
    color: "#ADADAD",
    fontWeight: "bold",
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  medicineContainer: {
    flexDirection: "row", // Arrange children in a row
    alignItems: "center", // Align children vertically in the center
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    marginBottom: 10,
    width: 380,
    height: 100,
  },
  medicineImage: {
    width: 80,
    height: 60,
    borderRadius: 10,
    resizeMode: "cover",
    marginRight: 10, // Add margin to separate the image from text
  },
  medicineInfo: {
    flex: 1, // Expand to fill available space
  },
  pricePcsContainer: {
    marginTop: 10,
    flexDirection: "row", // Arrange children in a row
    alignItems: "center", // Align children vertically in the center
    justifyContent: "space-between",
  },
  medicinePcs: {
    color: "#ADADAD",
    fontSize: 15,
    marginRight: 19,
  },
  medicinePrice: {
    color: "#209F84",
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    position: "absolute",
    right: 10,
  },
  Price1: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Medicines;
