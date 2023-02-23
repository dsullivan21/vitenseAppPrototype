import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import QRScanner from './screens/QRScanner.js';
import AddChatScreen from './screens/AddChatScreen.js';
import MadisonScorecardScreen from './screens/MadisonScorecardScreen.js';
import {createStackNavigator} from "@react-navigation/stack";
import MadisonCourseScreen from './screens/MadisonCourseScreen.js';
import ViewScorecardScreen from './screens/ViewScorecardScreen';
import RoundRecapScreen from './screens/RoundRecapScreen.js';
import ViewHistoryScreen from './screens/ViewHistoryScreen.js';
import LeaderboardScreen from './screens/LeaderboardScreen.js';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor: "#304d50"},
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
        <Stack.Screen name = 'Scorecard' component={ViewScorecardScreen}/>
        <Stack.Screen name = 'RoundRecap' component={RoundRecapScreen}/>
        <Stack.Screen name = 'History' component={ViewHistoryScreen}/>
        <Stack.Screen name = 'Leaderboard' component={LeaderboardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('vitensemini', ()  => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
