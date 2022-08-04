import React, {useState, useLayoutEffect, useEffect} from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';

function ViewScorecardScreen({navigation}) {

    const [scores, setScores] = useState([]);

    useEffect(() => {
       
        loadScore();

     }, [])

    //load score data from current round

    function loadScore(){

        var userUid = auth.currentUser.uid;
        //console.log(global.timestamp);
        if (userUid != null){

            var docRef = db.collection('scores').doc(userUid).collection('madisonCourse').doc(global.timestamp);

            docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {

                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }   



    return (
        <ScrollView style = {styles.container}>
            <View>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    scorecard:{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%"
    },
    cardContainer: {
        height: "100%",
    }
})

export default ViewScorecardScreen
