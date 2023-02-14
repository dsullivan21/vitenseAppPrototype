
import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { blue, white, bold } from 'ansi-colors';
import {auth} from '../firebase.js';
import firebase from 'firebase/app'



const MadisonCourseScreen = ({navigation}) => {
    const user = firebase.auth().currentUser;
    var userUID = user.uid;
    var name = user.displayName;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Madison Course",
            headerBackTitle: "Courses",
            headerTintColor: "white",
        })
    }, [navigation]);

   // const store = createStore();

    function addRound () {
        console.log("round started");
        //e.preventDefault();

      //  db.settings({
      //      timestampsInSnapshots: true
      //  });

        //create user scores collection
        const user = firebase.auth().currentUser;
        var userUID = user.uid;
      //  var name = user.displayName;
        var timestamp = new Date().getTime().toString();
        global.timestamp = timestamp.toString();
        console.log(timestamp);

        if (userUID != null){
            db.collection('scores').doc(userUID).collection("madisonCourse").doc(timestamp).set({
                player: user.displayName,
                date: timestamp,
            });
        }

        navigation.navigate("MadisonScoreCard");

    }

    
   

    return (
        <ScrollView style = {styles.container}>
            <Text style = {styles.courseHeader}> Madison Course </Text>
            <Text style = {styles.player}> {name} </Text>
            <TouchableOpacity
                    activeOpacity = {0.5}
                    style = {styles.submitPlayers}
                    onPress={
                        addRound}>
                    <Text>Add Another Golfer</Text> 
                </TouchableOpacity>
            <TouchableOpacity
                    activeOpacity = {0.5}
                    style = {styles.submitPlayers}
                    onPress={
                        addRound}>
                    <Text>Start Round</Text> 
                </TouchableOpacity>
                
        </ScrollView>
    )
}

export default MadisonCourseScreen

const styles = StyleSheet.create({
    courseHeader: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },

    enterPlayers: {
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 4,
        width: "90%",
        borderBottomWidth: 0,
        height: "30%",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
    },
    submitPlayers: {
        backgroundColor: "lightgreen",
        padding: 15,
        marginTop: 5,
        color: "white",
        fontWeight: "bold",
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        width: "70%",
        borderRadius: 5,
    }

})
