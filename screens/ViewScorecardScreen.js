import React, {useState, useLayoutEffect, useEffect} from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';

function ViewScorecardScreen({courseName, navigation}) {



    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Scanner",
            headerTintColor: "white",
            headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                <TouchableOpacity activeOpacity = {0.5} onPress = {() => navigation.goBack()}>
                    <Text style = {{color: "white", fontWeight: "800"}}>  Back </Text>
                </TouchableOpacity>
                </View>)
        })
    }, [navigation]);

    
    //TODO: fix doc ref based on selection
    var docRef = db.collection("madison").doc("par");
    const [scores, setScores] = useState({data: []});
    const [par, setPar] = useState(null);
    const [player, setPlayer] = useState(null);
    console.log(courseName);
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
                setPlayer({
                    id: doc.id,
                    data: playerName
                });

            } else {

                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }   

    function getStyle(score, index) {

        var parList = par["data"];
        console.log(index, "ind");
        console.log(score, "score");
        console.log(parList);
        console.log("list w index" , parList[index]);
        if (score == parList[index] +2 ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "#00008b", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }else if (score == parList[index] +1 ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "#90c6ee", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }
        else if (score == parList[index] - 1 ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "red", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }
        else if (score == parList[index] ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "#FFFFFF", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }
        else if (score < parList[index] - 1 ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "yellow", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }
        else if (score > parList[index] +2 ){
            console.log(" Checked to Yes");
            return{
                backgroundColor: "black", width: "100%",
                alignItems: "center",
                padding: 5,
                paddingBottom: 10,
                paddingTop: 10,borderBottomWidth: 0.5,
                borderColor: "#c6c6c6",
            }
        }

    }

    function getTextStyle(score, index){
        var parList = par["data"];
        
        console.log("list w index" , parList[index]);
        if (score > parList[index] + 1  || score == parList[index] -1 ){
            console.log(" Checked to Yes");
            return{
                color: "white",
                fontWeight: "600"
            }
        }
        else if (score < parList[index] -1) { 
            return{
                fontWeight: "600",
            }
        }
        else{
            return{
                fontWeight: "600",
            }
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
                <Text> Hole </Text>
            </View>
            {par && par["data"].map((score, index) => {index = index+1;
            return (
              <View style = { styles.holeNum} key = {index}>
                <Text style = { styles.scoreNum} key = {index} >{index}</Text>
              </View>
            );
          })}
          </View>
          <View style = {styles.center}>
            <View style = {styles.scoreTitle}>
                <Text> Par </Text>
            </View>
            {par && par["data"].map((score, index) => {console.log("score", score);
            return (
              <View style = { styles.score} key = {index}>
                <Text style = { styles.scoreNum} key = {index} >{score}</Text>
              </View>
            );
          })}
          </View>
          <View style = {styles.rightSide}>
          <View style = {styles.scoreTitle}>
                <Text> {player && player["data"]} </Text>
            </View>
          {scores["data"] && scores["data"].map((score, index) => {console.log("score", score);
            return (
              <View style = {getStyle(score, index)} key = {index}>
                <Text style = {getTextStyle(score, index)} key = {index} >{score}</Text>
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
    center: {
        width: "42.5%"
    },
    leftSide:{
        display:"flex",
        width: "15%",
    },
    rightSide:{
        display:"flex",
        width: "42.5%",
    },
    par: {
        backgroundColor: "#90c6ee",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    holeNum:{
        backgroundColor: "#fafafa",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        borderRightWidth: 1,
        borderBottomWidth: 0.5,
        borderColor: "#c6c6c6",
    },
    score: {
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        borderRightWidth: 1,
        borderBottomWidth: 0.5,
        borderColor: "#c6c6c6",
    },
    scoreTitle:{
        fontWeight: "900",
        backgroundColor: "#e6ffe6",
        width: "100%",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 0.5,
        borderColor: "#c6c6c6",
        
    }


})

export default ViewScorecardScreen