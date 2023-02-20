import React , {useState, useLayoutEffect, useEffect}from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';

const ViewHistoryScreen = ({navigation}) => {

    const [scores, setScores] = useState([]);
    var userUid = auth.currentUser.uid;
    var scores2 = [];
    var dates = [];

    useEffect(() => {

    //get all doc data 
    db.collection("scores").doc(userUid).collection("madisonCourse").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            
           var date = doc.data()["date"];
           var score =doc.data()["hole"];
           var combined = 0;
           for (let i = 0; i < score.length; i++){ 
               combined = combined + score[i];
           }
           
           scores2.push([date, combined]);
           //console.log(date);
           //dates.push(date);
           //scores.push()
           //console.log(scores);

           setScores(scores2);

        });
        
    });
   

    displayScores();

     }, [])

     function displayScores() {

        if (scores != null){
            //console.log("display", scores);
            
        }
     }



  return (
    <View><Text>ViewHistoryScreen</Text></View>
  )
}

export default ViewHistoryScreen