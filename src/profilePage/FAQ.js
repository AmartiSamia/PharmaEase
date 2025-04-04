import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image as RNImage } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import BottomProfil from "../bottomProfilPage.js";

const faqData = [
  {
    question: "How do I check if a pharmacy is on emergency duty today?",
    answer:
      "In the 'All Pharmacies' section, pharmacies on emergency duty will be marked. You can also use the 'Emergency Pharmacies Today' option to see only those that are on emergency duty.",
  },
  {
    question: "How can I find more information about a specific pharmacy?",
    answer:
      "Tap on a pharmacy's name from the list to view its contact number and location. You can also get directions via Google Maps.",
  },
  {
    question: "How often is the pharmacy emergency schedule updated?",
    answer:
      "Use the location services to find p-The emergency schedule is updated daily based on the information provided by local authorities.harmacies near your current location.",
  },
  {
    question: "How accurate is the medicine information in the app?",
    answer:
      "We strive to provide the most accurate and up-to-date information. However, always consult with a healthcare professional before taking any medication.",
  },
  {
    question: "Can I get directions to a pharmacy using Google Maps?",
    answer:
      "Yes, tap on the pharmacy’s location to open it in Google Maps and get directions.",
  },
  {
    question: "How can I find all the pharmacies in Tangier?",
    answer:
      "From the home page, tap on the first option labeled 'All Pharmacies. You'll see a list of all pharmacies along with emergency status information for the day.",
  },
  {
    question: "The app is not loading correctly, what should I do?",
    answer:
      "Ensure you have a stable internet connection. If the issue persists, try restarting the app or your device. If the problem continues, contact our support team through the app.",
  },
  {
    question: "How do I find pharmacies near my current location?",
    answer:
      "Use the 'Pharmacies Nearby' option on the home page. The app will use your current location to display a list of nearby pharmacies.",
  },
  {
    question: "How do I report a bug or give feedback?",
    answer:
      "Go to the 'Help and Support' page and select 'Report a Bug' or 'Give Feedback'. Provide as much detail as possible to help us address the issue or consider your feedback.",
  },
];

const FAQSupport = ({ navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [search, setSearch] = useState("");

  const handlePress = (index) => {
    setActiveSections(
      activeSections.includes(index)
        ? activeSections.filter((i) => i !== index)
        : [...activeSections, index]
    );
  };

  const filteredFaqData = faqData.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

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
      headerTitle: "FAQ & Support",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        height: 100,
        borderBottomWidth: 0,
        backgroundColor: "#E8F3F1",
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.generalTitle}>Find answers to your problems</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconSearch}
            source={require("../../assets/Search.png")}
            resizeMode="contain"
          />
          <TextInput
            onChangeText={setSearch}
            value={search}
            style={styles.input}
            placeholder="Search Question..."
            placeholderTextColor="#ADADAD"
          />
        </View>

        <View style={styles.cardsContainer}>
          {filteredFaqData.map((item, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.questionBar}
                onPress={() => handlePress(index)}
              >
                <Text style={styles.question}>{item.question}</Text>
                <RNImage
                  source={
                    activeSections.includes(index)
                      ? require("../../assets/Profile/UP.png")
                      : require("../../assets/Profile/DOWN.png")
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Collapsible collapsed={!activeSections.includes(index)}>
                <Text style={styles.answer}>{item.answer}</Text>
              </Collapsible>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomProfil />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F3F1",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 60, // Adjust this value to accommodate the bottom profile bar
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E8F3F1",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 24,
    width: 374,
    height: 50,
    backgroundColor: "#F9FAFB",
    color: "#ADADAD",
  },
  iconSearch: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  input: {
    height: 30,
    flex: 1,
    color: "#ADADAD",
    fontWeight: "bold",
  },
  generalTitle: {
    color: "#717784",
    fontWeight: "700",
    padding: 20,
    fontSize: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#199A8E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    width: 374,
  },
  question: {
    color: "#199A8E",
    fontFamily: "Poppins-semiBold",
    fontSize: 19,
    fontWeight: "600",
  },
  answer: {
    paddingTop: 8,
    color: "#908F8F",
    fontSize: 16,
    fontFamily: "Poppins-medium",
    paddingBottom: 8,
    fontWeight: "700",
  },
  icon: {
    width: 14,
    height: 8,
    paddingTop: 20,
  },
  questionBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default FAQSupport;
