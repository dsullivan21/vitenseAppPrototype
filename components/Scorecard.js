import React, {useState, useLayoutEffect, useEffect} from 'react'

import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import {auth} from '../firebase.js';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';

//Function holds the scorecard of the app

function Scorecard( { holeNum, players, course} ) {

    const [scores, setScores] = useState([]);
    const [names, setNames] = useState([]);
    const [totalScores, setTotal] = useState([]);
    var docRef = db.collection("madison").doc("par");
    var docRefNames = db.collection("madison").doc("names");
    const user = firebase.auth().currentUser;
    var userUID = user.uid;
    var name = user.displayName;

    console.log("hole num", holeNum);
    //var stringVal = holeNum.toString();
    //var name = db.collection('madison').doc('names').get().then((value)=> console.log(value.data));
   // console.log(name);
    var nameComplete = false;
    var parComplete = false;
    var parData;
    var par; 
    //send score data backwards to parent

//
    //get par data

    function getParData(){
      
        docRef.get().then((doc) => {
            if (doc.exists && parComplete == false) {
                console.log("Document data:", doc.data());
                var parObj = doc.data();
                //get par data as array
                var parList = Object.values(parObj);
               // var holeList = Object.keys(parObj);
                console.log(parList);
                setScores({
                    id: doc.id,
                    data: parList,
                })
                parComplete = true;
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

    //get hole name data

    function getNameData(){
        docRefNames.get().then((doc) => {
            if (doc.exists && nameComplete == false) {
               // console.log("Document data:", doc.data());
               var nameObj = doc.data();
               var names = Object.values(nameObj);
                setNames({
                    id: doc.id,
                    data: names,
                })
                nameComplete = true;
                return true;
                //console.log(doc.data);
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
    
    useEffect(() => {
       
        getNameData();
  
        getParData();
        //return unsubscribe;
     }, [holeNum])

    
    
   
    //const [hole, setHole] = useState(1);

    //console.log(holeNum)
     var HoleName = names['data'];

     var HolePar = parseInt(scores['data']);
   // console.log(scores["data"]);


   // console.log(names["data"]);



//console.log(Object.values(names["data"][holeNum]));
    const [counter, setCounter] = useState(3);  

  
    // Function is called everytime increment button is clicked
    // Handles score addition
    const increaseScore = () => {
      // Counter state is incremented
      setCounter(counter + 1);
    }
    
    // Function is called everytime decrement button is clicked
    const decreaseScore = () => {
      // Counter state is decremented
      setCounter(counter - 1);
    }


    //save scores to db by userID
    function saveScores(){

        console.log(HolePar);
        console.log(scores["data"]);
        if (totalScores.length < holeNum){
            setScores(totalScores.push(counter));
        }
        else if (totalScores.length == holeNum){
            totalScores.pop();
            setScores(totalScores.push(counter));
        }
        
        console.log(totalScores);
        var userUid = auth.currentUser.uid;
        console.log(global.timestamp);
        if (userUid != null){
            db.collection('scores').doc(userUid).collection('madisonCourse').doc(global.timestamp).update({
                hole: totalScores,
            });
        }
    }   

  
    

    return (
        
        <ScrollView >
            
            <View>
                <ListItem >
                    <Text style= {styles.title}> {HoleName}</Text>
                </ListItem>
                <ListItem style= {styles.scoreGrid}> 
                    <Text>Hole: {holeNum}</Text>
                    <Text>Par: {HolePar}</Text>
                </ListItem>

            </View>

            <View style=  {styles.scoreGroup}>
            <Text style = {styles.playerName}> {name} </Text>
            <ListItem style = {styles.scoreGrid}>
                <ListItem>
                    <TouchableOpacity style = {styles.addScore} onPress={
                       decreaseScore
                    }>
                    <Text> - </Text>
                    </TouchableOpacity>
                </ListItem>
            
                <ListItem>
                    <Text style = {styles.score}>{counter}</Text>
                </ListItem>

                <ListItem style = {styles.scorecardGrid}>
                    <TouchableOpacity style = {styles.removeScore} onPress={
                        increaseScore
                    }>
                    <Text> + </Text>
                    </TouchableOpacity>
                </ListItem>
            </ListItem>

            <ListItem> 
            <TouchableOpacity style = {styles.saveScore}> 
                <Text onPress={saveScores}> Save Score </Text>
            </TouchableOpacity>
            </ListItem>
            </View>
            
        </ScrollView>
    )
}

export default Scorecard

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        },
    headerStyle: {
        fontWeight: "600", 
        backgroundColor: "white", 
        color: "black",
    },
    addScore:{
        display: "flex",
        flexDirection: "row",
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#FAFAFA",
        padding: 4,
        borderRadius: 2,
    },
    saveScore: {
        backgroundColor: "lightgreen",
        padding: 5,
        borderRadius: 2,
    },
    removeScore:{
        display:  "flex",
        flexDirection: "row",
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#FAFAFA",
        padding: 4,
        borderRadius: 2,
    },
    score:{
        display: "flex",
        flexDirection: "row",
        padding: 4,
    },
    title:{
        fontWeight: "600",
    },
    scoreGrid: {
        paddingLeft: 0,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
    },
    scoreGroup:{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
    }
})