import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import QRScanner from './screens/QRScanner.js';
import AddChatScreen from './screens/AddChatScreen.js';
import MadisonScorecardScreen from './screens/MadisonScorecardScreen.js';
import {createStackNavigator} from "@react-navigation/stack";
import MadisonCourseScreen from './screens/MadisonCourseScreen.js';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor: "green"},
  headerTitleStyle: {color: "white"}, //Header color
  headerTintColor: "white"//Icon color
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName = "Home" screenOptions = {globalScreenOptions}> 
        <Stack.Screen name = 'Login' component={LoginScreen}/>
        <Stack.Screen name = 'MadisonScreen' component={MadisonCourseScreen}/>
        <Stack.Screen name = 'AddChat' component={AddChatScreen}/>
        <Stack.Screen name = 'MadisonScoreCard' component={MadisonScorecardScreen}/>
        <Stack.Screen name = 'Register' component={RegisterScreen}/>
        <Stack.Screen name = 'Home' component={HomeScreen}/>
        <Stack.Screen name = 'QRScanner' component={QRScanner}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
