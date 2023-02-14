import React, {useState, useLayoutEffect, useEffect} from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';

function ViewScorecardScreen({navigation}) {

    var docRef = db.collection("madison").doc("par");
    const [scores, setScores] = useState(null);
    const [par, setPar] = useState(null);
    var parAndScore;

    function loadPar(){
        docRef.get().then((doc) => {
            if (doc.exists ) {
                console.log("Document data:", doc.data());
                var parObj = doc.data();
                //get par data as array
                var parList = Object.values(parObj);
               // var holeList = Object.keys(parObj);
                console.log(parList);
                setPar({
                    id: doc.id,
                    data: parList,
                })
                return true;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
        return false;
    }

    //load score data from current round

    function loadScore(){

        var userUid = auth.currentUser.uid;
        //console.log(global.timestamp);
        if (userUid != null){

            var scores1, playerName;
            var docRef = db.collection('scores').doc(userUid).collection('madisonCourse').doc(global.timestamp);

            docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                scores1 = doc.data().hole;
                playerName = doc.data().player;
                setScores({
                    id: doc.id,
                    data: scores1,
                });

            } else {

                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }   

    useEffect(() => {
       
        loadPar();
        loadScore();

     }, [])

    return (
        <ScrollView style = {styles.container}>
            <View style = {styles.scorecardContainer}>
            <View style = {styles.leftSide}>
            <View style = {styles.scoreTitle}>
                <Text> Par </Text>
            </View>
            {par && par["data"].map((score) => {console.log("score", score);
            return (
              <View style = {styles.score} key = {score}>
                <Text style = {styles.scoreNum} key = {score} style={styles.item}>{score}</Text>
              </View>
            );
          })}
          </View>
          <View style = {styles.rightSide}>
          <View style = {styles.scoreTitle}>
                <Text> Score </Text>
            </View>
          {scores && scores["data"].map((score) => {console.log("score", score);
            return (
              <View style = {styles.par} key = {score}>
                <Text style = {styles.parNum} key = {score} style={styles.item}>{score}</Text>
              </View>
            );
          })}
            </View>
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
    scorecardContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    },
    cardContainer: {
        height: "100%",
    },
    leftSide:{
        display:"flex",
        width: "50%",
    },
    rightSide:{
        display:"flex",
        width: "50%",
    },
    par: {
        backgroundColor: "#90c6ee",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    score: {
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    scoreTitle:{
        fontWeight: "900",
        backgroundColor: "#e6ffe6",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        
    }


})

export default ViewScorecardScreen