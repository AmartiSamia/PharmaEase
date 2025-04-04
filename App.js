import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginSignUpForm from "./src/Authenfication/LoginSignUpForm";
import LoginForm from "./src/Authenfication/Login";
import SignUpForm from "./src/Authenfication/Signup";
import FirstPage from "./FirstPage";
import OnBoarding1 from "./src/Splash/OnBoarding1";
import OnBoarding2 from "./src/Splash/OnBoarding2";
import OnBoarding3 from "./src/Splash/OnBoarding3";
import OpeningPage from "./OpeningPage";
import Test from "./src/allPharmaciesPage/Test";
import Test2 from "./src/allPharmaciesPage/Test2";
import Emergency from "./src/emergencyPages/Emergency";
import Emergency2 from "./src/emergencyPages/Emergency2";
import Nearby from "./src/PharmacyNearbyPage/Nearby";
import Medicines from "./src/medicinePage/Medicines";
import MedicineDetail from "./src/medicinePage/MedicineDetail";
import Profile from "./src/profilePage/Profile";
import FeedBack from "./src/profilePage/FeedBack";
import FAQ from "./src/profilePage/FAQ";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
        <Stack.Screen name="LoginSignUpForm" component={LoginSignUpForm} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="OpeningPage" component={OpeningPage} />
        <Stack.Screen name="Emergency" component={Emergency} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Test2" component={Test2} />
        <Stack.Screen name="Emergency2" component={Emergency2} />
        <Stack.Screen name="Nearby" component={Nearby} />
        <Stack.Screen name="Medicines" component={Medicines} />
        <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FeedBack" component={FeedBack} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
