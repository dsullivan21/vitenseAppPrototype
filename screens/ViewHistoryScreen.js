import React , {useState, useLayoutEffect, useEffect}from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';

const ViewHistoryScreen = ({navigation}) => {

    const [scores, setScores] = useState({});
    const [dates, setDates] = useState([]);
    var userUid = auth.currentUser.uid;
    var scores2 = [];
    var dates2 = [];

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

           var formatted = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit',hour: '2-digit', minute: '2-digit'}).format(date);
           
           scores2.push(combined);
           dates2.push(formatted);

           //console.log(date);
           //dates.push(date);
           //scores.push()
           //console.log(scores);

           setScores({
               data: scores2,
               date: dates2
            });
           

        });

        var reversedScore = scores["data"].slice(0).reverse();
        var reversedDate = scores["date"].slice(0).reverse();

        setScores({
            data: reversedScore,
            date: reversedDate
        });
        
    });
   

    displayScores();

     }, [])

     function displayScores() {

        if (scores != null){
            console.log("display", scores);

           /* for (let i = 0; i < scores.length; i++){
                for (let j = 0; j < scores[i].length; j++){

                    

                }
            }
            
           */
        }

     }



  return (
    <ScrollView>
        <View style = {styles.mainContainer}> 
        <View style = {styles.historyContainer}>
            <Text style = {styles.dateHeader}>Date Played</Text>
            <Text style = {styles.scoreHeader}>Score</Text>
        </View>
        
        {scores["data"] && scores["data"].map((score, index) => {
            {
                    return (
                        <View style = {styles.historyContainer} key = {index}>
                          <Text style = {styles.date}key = {index-100} >{scores["date"][index]}</Text>
                          <Text style = {styles.scores} key = {index+100} >{scores["data"][index]}</Text>
                        </View>
                      );                    
            
            }
            
          })}
        </View>
        </ScrollView>
     


    
  )
}

export default ViewHistoryScreen

const styles = StyleSheet.create({

    mainContainer: {
        width: "100%"
    },

    historyContainer:{ 
        display: "flex",
        flexDirection: "row",
        minWidth: "100%"
    },
    date: {
        fontSize: 18,
        fontWeight: "700",
        borderWidth: 1,
        padding: 15,
        width: "80%",
        color: "#304d50",
        borderColor: "#c6c6c6",
        backgroundColor: "white",
    },
    scores: {
        fontSize: 18,
        fontWeight: "700",
        borderWidth: 1,
        borderColor: "#c6c6c6",
        padding: 15,
        width: "20%",
        color: "#304d50",
        backgroundColor: "white",
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: "900",
        padding: 15,
        width: "78%",
        backgroundColor: "#e6ffe6",
    },
    scoreHeader: {
        fontSize: 18,
        fontWeight: "900",
        padding: 15,
        width: "25%",
        backgroundColor: "#e6ffe6"
    }


})