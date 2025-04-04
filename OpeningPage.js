import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomNavigationBar from "./bottomNavigationBar";

const OpeningPage = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleMedicine = () => {
    navigation.navigate("Medicines");
  };
  const handleTest = () => {
    navigation.navigate("Test");
  };
  const handleNearby = () => {
    navigation.navigate("Nearby");
  };
  const Test2 = () => {
    navigation.navigate("Test2");
  };

  const Emergency = () => {
    navigation.navigate("Emergency");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Find your ideal health solution with just a tap!
        </Text>
        <View style={styles.allPharmacies}>
          <Image
            style={styles.allPharmaciesPic}
            source={require("./assets/OpeningPage/AllPharmacies.png")}
            resizeMode="contain"
          />
          <View style={{ marginLeft: 200, position: "absolute" }}>
            <Text style={styles.textAllPharmacies}>All Pharmacies</Text>
            <TouchableOpacity
              style={styles.buttonAllPharmacies}
              onPress={handleTest}
            >
              <Text style={styles.buttonTextAllPharmacies}>Click to see</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chooseMedicines}>
            <View style={styles.textMedicines}>
              <Text style={styles.textchooseMedicines1}>Choose medicines</Text>
              {/* <Text style={styles.textchooseMedicines2}>+ Delivery Option</Text> */}
            </View>
            <View>
              <Image
                style={styles.chooseMedicinesPic}
                source={require("./assets/OpeningPage/chooseMedicinesPic.png")}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.buttonchooseMedicines}
                onPress={handleMedicine}
              >
                <Text style={styles.buttonTextchooseMedicines}>
                  Click to see
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.allPharmacies, { marginTop: 15 }]}>
            <Image
              style={styles.allPharmaciesPic}
              source={require("./assets/OpeningPage/PharmacieNearBy.png")}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 200, position: "absolute" }}>
              <Text style={[styles.textAllPharmacies, { marginLeft: -25 }]}>
                Pharmacies nearby
              </Text>
              <TouchableOpacity
                style={[styles.buttonAllPharmacies, { marginLeft: 10 }]}
                onPress={handleNearby}
              >
                <Text style={styles.buttonTextAllPharmacies}>Click to see</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.chooseMedicines,
              { position: "absolute", marginTop: 450 },
            ]}
          >
            <View style={styles.textMedicines}>
              <Text style={styles.textchooseMedicines1}>
                Emergency pharmacy
              </Text>
            </View>
            <View>
              <Image
                style={styles.chooseMedicinesPic}
                source={require("./assets/OpeningPage/24Pharmacy.png")}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.buttonchooseMedicines}
                onPress={Emergency}
              >
                <Text style={styles.buttonTextchooseMedicines}>
                  {" "}
                  Click to see
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 60,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#908F8F",
    fontSize: 23,
    fontWeight: "600",
    marginTop: -460,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 39,
    marginRight: 32,
    // alignItems: "center",
  },
  textAllPharmacies: {
    color: "#101623",
    fontSize: 18,
    position: "absolute",
    marginTop: 35,
    fontWeight: "bold",
  },
  buttonAllPharmacies: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    position: "absolute",
    width: 97,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignItems: "center",
    marginLeft: 18,
    marginTop: 76,
  },
  buttonTextAllPharmacies: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    color: "white",
  },
  allPharmacies: {
    borderRadius: 25,
    width: 365,
    height: 135,
    backgroundColor: "#E8F3F1",
    position: "relative",
  },

  allPharmaciesPic: {
    width: 153,
    height: 138,
    position: "absolute",
    marginLeft: 12,
  },
  chooseMedicines: {
    borderRadius: 25,
    marginTop: 150,
    height: 138,
    width: 365,
    height: 135,
    position: "relative",
    backgroundColor: "#E8F3F1",
  },
  chooseMedicinesPic: {
    marginLeft: 200,
    position: "absolute",
    width: 163,
    height: 143,
  },
  buttonTextchooseMedicines: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "800",
    color: "white",
  },
  buttonchooseMedicines: {
    backgroundColor: "#209F84",
    borderRadius: 32,
    position: "absolute",
    width: 97,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignItems: "center",
    marginLeft: 52,
    marginTop: 76,
  },
  textchooseMedicines1: {
    fontSize: 18,
    position: "absolute",
    fontWeight: "bold",
    marginTop: 30,
  },
  textchooseMedicines2: {
    fontSize: 14,
    color: "#101623",
    opacity: 0.64,
    textAlign: "center",
    position: "absolute",
    marginTop: 51,
  },
  textMedicines: {
    width: "60%",
    textAlign: "center",
    alignItems: "center",
  },
});

export default OpeningPage;
