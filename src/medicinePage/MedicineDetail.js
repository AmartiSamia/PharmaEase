import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { imageMapper } from "../../API/MedicineImageMapper";
import BottomNavigationBar from "../../bottomNavigationBar";
const MedicineDetail = ({ route }) => {
  const { medicine } = route.params;
  const navigation = useNavigation();

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
      headerTitle: medicine.name.split(" ")[0],
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
  }, [navigation, medicine.name]);

  // Function to split description into sentences
  const splitDescription = (desc) => {
    return desc.split(".").map(
      (sentence, index) =>
        sentence.trim() !== "" && (
          <Text key={index} style={styles.desc}>
            {sentence.trim()}.
          </Text>
        )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={imageMapper[medicine.Picture]} style={styles.image} />
        <Text style={styles.name}>{medicine.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {medicine.Price} <Text style={{ color: "black" }}>/</Text>{" "}
            <Text style={styles.pcs}>{medicine.Pcs}</Text>
          </Text>
        </View>
        {medicine.Reason && (
          <Text style={styles.reason}>{medicine.Reason}</Text>
        )}
        <View style={styles.listContainer}>
          {medicine.Pregnant && (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.listItemText}>
                <Text style={styles.gras}>Pregnant:</Text>
                <Text style={styles.text}>{medicine.Pregnant}</Text>
              </View>
            </View>
          )}
          {medicine.Breastfeeding && (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.listItemText}>
                <Text style={styles.gras}>Breastfeeding:</Text>
                <Text style={styles.text}>{medicine.Breastfeeding}</Text>
              </View>
            </View>
          )}
          {medicine.Form && (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.listItemText}>
                <Text style={styles.gras}>Form:</Text>
                <Text style={styles.text}>{medicine.Form}</Text>
              </View>
            </View>
          )}
        </View>
        <Text style={styles.descriptionTitle}>Description</Text>
        {splitDescription(medicine.Desc)}
      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80, // Add padding to the bottom to ensure the content is fully visible
  },
  image: {
    width: 250,
    height: 210,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 21,
    color: "#209F84",
  },
  pcs: {
    color: "#ADADAD",
    fontSize: 21,
  },
  listContainer: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  bullet: {
    fontSize: 19,
    lineHeight: 22,
    marginRight: 10,
    color: "#209F84",
  },
  listItemText: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gras: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontSize: 16.8,
    flex: 1,
  },
  reason: {
    fontSize: 17.2,
    color: "#ADADAD",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginTop: 5,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#209F84",
    marginTop: 10,
    marginBottom: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },
});

export default MedicineDetail;
