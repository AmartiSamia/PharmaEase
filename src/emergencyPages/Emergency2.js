import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Emergency2 = ({ route, navigation }) => {
  const { latitude, longitude, name } = route.params || {};

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
          source={require("../../assets/Header/Allpharmacie.png")}
          style={{ width: 24.5, height: 25.57, marginRight: 30, marginTop: -8 }}
        />
      ),
      headerTitle: name,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      headerStyle: {
        height: 70,
        borderBottomWidth: 0,
      },
    });
  }, [navigation]);
  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    }
  }, [latitude, longitude]);
  const handleMapLinkPress = () => {
    const trimmedMapLink = mapLink.trim();
    if (trimmedMapLink) {
      const url = Platform.select({
        ios: `maps://?q=${trimmedMapLink}`,
        android: `https://www.google.com/maps/search/?api=1&query=${trimmedMapLink}`,
      });

      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.error("Cannot handle map URL:", url);
          }
        })
        .catch((err) => console.error("An error occurred", err));
    } else {
      console.error("No map link provided");
    }
  };
  return (
    <View style={styles.container}>
      {latitude !== undefined && longitude !== undefined ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            title="Pharmacy Location"
          />
        </MapView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Emergency2;
