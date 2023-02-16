
import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
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
            <View style = {styles.containerMain}> 
            <View style = {styles.players}>
            <View style = {styles.header}>
                <Text style = {styles.courseHeader}> Madison Course </Text>
            </View>
            
                <View style = {styles.groupHeader}> 
                    <Text style = {styles.playerHeader}> Golf Group  </Text>
                </View>
                <View style = {styles.golferContainer}>
                    <Text style = {styles.player}> {name} </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity = {0.5}
                    style = {styles.submitPlayers}
                    onPress={
                        addRound}>
                    <Text style = {{color: "white", fontWeight : "700"}}>Add Another Golfer</Text> 
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity = {0.5}
                    style = {styles.submitPlayers}
                    onPress={
                        addRound}>
                    <Text style = {{color: "white", fontWeight : "700"}}>Start Round</Text> 
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    )
}

export default MadisonCourseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMain: {
        flex: 1,
    },
    courseHeader: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        color: "white",
        width: "131%",
        padding: 20,
        backgroundColor:"#304d50",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        marginBottom: 15,

    },
    players: {
        justifyContent:"center",
        padding: 40,
        backgroundColor: "white",
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        marginTop: 40,
        paddingTop: 0,
    },
    playerHeader: {
        fontWeight: "800",
        fontSize: 16,
        textAlign: "center",
    },
    player: {
        fontWeight: "600",
        fontSize: 16,
    },
    groupHeader: {
        padding: 10,
        borderRadius: 10,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        backgroundColor: "white",
        
    },

    golferContainer: {

        backgroundColor: "white",
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
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
        backgroundColor: "#304d50",
        padding: 15,
        marginTop: 5,
        color: "white",
        fontWeight: "bold",
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        width: "40%",
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10,
    },

    buttonContainer: {
        width: '100%',
        height: 50,
        display:'flex',
        flexDirection: "row",
        marginTop: 50
    },

})
