import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import debounce from "lodash.debounce";
import pharmaciesData from "../../API/outputEmergency.json";

interface ListingMapsProps {
  searchText: string;
}

interface pharmacy {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  duration: null;
  distance1: null;
}

const ListingMaps = ({ searchText }: ListingMapsProps) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");

  const [pharmacies, setPharmacies] = useState<pharmacy[]>([]);
  const [emergencyPharmacies, setEmergencyPharmacies] = useState<pharmacy[]>(
    []
  );

  const [circleRadius, setCircleRadius] = useState(750); // Initial radius for the circle
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status != "granted") {
      alert("Permission to access location was denied !");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    /*console.log("locationnnnnnn : "+location.coords.altitude + " "+location.coords.longitude);*/
    const { latitude, longitude } = location.coords;
    setUserLatitude(latitude);
    setUserLongitude(longitude);

    /*let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const dataRegion = response.data;
      // Get the country code from the address information
      console.log(dataRegion)
      setCountryCode(dataRegion.address.country_code);
      setCity(dataRegion.address.city)
      console.log(countryCode);
      console.log (city)*/

    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const [gardPharmacies, setGardPharmacies] = useState<pharmacy[]>([]);
  const findPharmaciesNearby = async (lat: number, long: number) => {
    const query = `http://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="pharmacy"](around:750,${lat},${long});out;`;
    let response = await axios.get(query);

    const pharmaciesData = response.data.elements.map((element: any) => ({
      name: element.tags.name,
      address: element.tags["addr:street"],
      latitude: element.lat,
      longitude: element.lon,
      duration: null,
      distance1: null,
    }));
    setPharmacies(pharmaciesData);
    console.log(pharmacies);
  };

  const findPharmaciesByName = async (name: string) => {
    const formattedName = convertToEnglish(name).toLowerCase(); // Ensure consistent formatting

    const south = region.latitude - 0.1;
    const west = region.longitude - 0.1;
    const north = region.latitude + 0.1;
    const east = region.longitude + 0.1;

    // Construct the API query URL to search pharmacies within the bounding box
    const query = `http://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="pharmacy"]["name"~"${name}",i](${south},${west},${north},${east});out;`;
    try {
      const response = await axios.get(query);
      const pharmaciesData = response.data.elements.map((element: any) => ({
        name: convertToEnglish(element.tags.name),

        address: element.tags["addr:street"] || undefined,
        latitude: element.lat,
        longitude: element.lon,
        duration: null,
        distance1: null,
      }));

      setPharmacies(pharmaciesData);

      if (pharmacies.length > 0) {
        const index = pharmaciesData.findIndex((pharmacy: any) =>
          pharmacy.name.toLowerCase().includes(name.toLowerCase())
        );
        if (index !== -1 && pharmacies[index]) {
          setRegion({
            latitude: pharmacies[index].latitude,
            longitude: pharmacies[index].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          Alert.alert(
            "No Pharmacies Found",
            "Sorry, no pharmacies match your search. Please try again."
          );
        }
        console.log(pharmacies);
        console.log(pharmacies[index]);
      } else {
        findPharmaciesNearby(userLatitude, userLongitude);
      }
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    }
  };

  const convertToEnglish = (name: string) => {
    if (name) {
      return name.replace(/Pharmacie/g, "Pharmacy").trim();
    } else {
      return ""; // Return an empty string if 'name' is undefined
    }
  };

  const fetchEmergencyPharmacies = () => {
    try {
      const emergencyPharmaciesData: pharmacy[] = pharmaciesData.map(
        (pharmacy: any) => ({
          name: convertToEnglish(pharmacy.name),
          address: pharmacy.address,
          latitude: pharmacy.latitude,
          longitude: pharmacy.longitude,
          duration: null,
          distance1: null,
        })
      );
      console.log("Emergency Pharmacies:", emergencyPharmaciesData);
      setEmergencyPharmacies(emergencyPharmaciesData);
    } catch (error) {
      console.error("Error fetching emergency pharmacies:", error);
    }
  };

  useEffect(() => {
    const fetchUserLocationAndPharmacies = async () => {
      await userLocation(); // Fetch user location first
      await findPharmaciesNearby(userLatitude, userLongitude); // Then fetch nearby pharmacies
    };

    fetchUserLocationAndPharmacies(); // Call the function
    fetchEmergencyPharmacies();
  }, []);

  useEffect(() => {
    const delayedSearch = debounce(() => {
      if (!searchText || searchText.trim() === " ") {
        findPharmaciesNearby(userLatitude, userLongitude);
      } else {
        findPharmaciesByName(searchText);
      }
    }, 1000); // Set the delay time in milliseconds

    delayedSearch(); // Initial call to trigger the search function

    return delayedSearch.cancel; // Cleanup function to cancel debounce on component unmount
  }, [searchText]);
  const getMarkerImage = (pharmacyName: string) => {
    const convertedName = convertToEnglish(pharmacyName);
    const isEmergency = emergencyPharmacies.some(
      (pharmacy) => pharmacy.name === convertedName
    );
    console.log(`${convertedName} is emergency: ${isEmergency}`);
    return isEmergency
      ? require("../../assets/Location/garde.png")
      : require("../../assets/Location/pin5.png");
  };

  return (
    <View>
      <MapView
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        region={region}
      >
        {pharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
            title={pharmacy.name}
            description={pharmacy.address}
          >
            <Image
              source={getMarkerImage(pharmacy.name)}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
        ))}
        {emergencyPharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
            title={pharmacy.name}
            description={pharmacy.address}
          >
            <Image
              source={require("../../assets/Location/garde.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
        ))}

        <Circle
          center={{ latitude: userLatitude, longitude: userLongitude }}
          radius={circleRadius}
          fillColor="rgba(255, 0, 0, 0.1)" // Adjust circle color and opacity
          strokeWidth={1}
          strokeColor="rgba(255, 0, 0, 0.5)" // Adjust circle border color and opacity
        />
      </MapView>
    </View>
  );
};

export default ListingMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
