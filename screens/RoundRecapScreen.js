import React, {useState, useLayoutEffect, useEffect} from 'react'
import { db } from '../firebase';
import {auth} from '../firebase.js';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'

//Recap of the Round display

const RoundRecapScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Round Recap",
            headerTintColor: "white",
            headerLeft: null,
        })
    }, [navigation]);

    var docRef = db.collection("madison").doc("par");
    const [scores, setScores] = useState({data: []});
    const [par, setPar] = useState({data: []});
    const [player, setPlayer] = useState(null);

    var totalScore = 0;
    var evenRound = 0; 
    var scorevspar = 0;

    function loadPar(){
        docRef.get().then((doc) => {
            if (doc.exists ) {
                //console.log("Document data:", doc.data());
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
              //  console.log("Document data:", doc.data());
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

    useEffect(() => {
       
        loadPar();
        loadScore();
     }, [])


     function combineScore() {

        if (scores["data"] != null && par["data"]!= null){

            for (let i = 0; i < scores["data"].length; i++){
                totalScore = totalScore + scores["data"][i];
            }

            for (let i = 0; i <  par["data"].length; i++){
                evenRound = evenRound +  par["data"][i];
            }

            scorevspar = totalScore - evenRound;
            console.log(scorevspar , "scores");
        }

     }

     combineScore();


  return (
      <ScrollView>
           <View><Text>RoundRecapScreen</Text></View>

           <View><Text> You shot {scorevspar} !</Text></View> 

           <View><Text> Overall Score: {totalScore} </Text></View> 

           <View><Text> Even Round {evenRound} </Text></View> 

            <TouchableOpacity onPress = {() => navigation.navigate('Home')}> 
                <Text> Return Home</Text>
            </TouchableOpacity>
            
      </ScrollView>
   
  )
}

export default RoundRecapScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
})