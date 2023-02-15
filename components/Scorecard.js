import React, {useState, useLayoutEffect, useEffect, useRef} from 'react'

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


    //trigger save scores on next hole click
    const didMountRef = useRef(false);
    useEffect(() => {
       
        getNameData();
  
        getParData();
        if (didMountRef.current) {
            saveScores();
          } 
        else didMountRef.current = true
        
        //return unsubscribe;
     }, [holeNum])

    
    
   
    //const [hole, setHole] = useState(1);

    //console.log(holeNum)
     
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

        var HoleName = names && names['data'];
        //console.log(HoleName[0]);

        

        var HolePar = parseInt(scores['data']);


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
        
        <ScrollView style = {styles.container}>
            
            <View>
                <View style = {styles.titleContainer}>
                    <Text style= {styles.title}> {names && HoleName ? HoleName[holeNum -1] : ""}</Text>
                </View>
                <ListItem style= {styles.scoreGrid}> 
                    <View style = {styles.par}> 
                    <Text style = {styles.partext}>Hole: {holeNum}</Text>
                    <Text style = {styles.partext}>Par: {HolePar}</Text>
                    </View>
                </ListItem>

            </View>

            <View style=  {styles.changeScore}>
            <Text style = {styles.playerName}> {name} </Text>
            <ListItem style = {styles.scorebuttons}>
                <ListItem>
                    <TouchableOpacity style = {styles.addScore} onPress={
                       decreaseScore
                    }>
                    <Text style = {{color:"#304d50", fontWeight: "700", fontSize: 16}}> - </Text>
                    </TouchableOpacity>
                </ListItem>
            
                <ListItem>
                    <Text style = {styles.score}>{counter}</Text>
                </ListItem>

                <ListItem style = {styles.scorecardGrid}>
                    <TouchableOpacity style = {styles.removeScore} onPress={
                        increaseScore
                    }>
                    <Text style = {{color:"#304d50",fontWeight: "700", fontSize: 16}}> + </Text>
                    </TouchableOpacity>
                </ListItem>
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
    titleContainer:{
        display: "flex",
        justifyContent: "center",
        margin: 10,
        padding: 10,
    },
    par:{
        display: "flex",
        flexDirection: "row",
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15
    },
    partext:{
        fontWeight: "500",
        color: "#304d50",
        padding: 10
    },
    addScore:{
        display: "flex",
        flexDirection: "row",
        borderColor: "gray",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    saveScore: {
        backgroundColor: "#c9e5d9",
        padding: 15,
        borderRadius: 2,
        marginBottom: 20,
    },
    saveScoreText: {
        textAlign: 'center',
    },
    removeScore:{
        display:  "flex",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    scorebuttons:{
        marginTop: 10,

    },
    score:{
        display: "flex",
        flexDirection: "row",
        padding: 4,
        fontSize: 18,
        color: "#304d50",
        fontWeight: "700"
    },
    title:{
        fontWeight: "600",
        justifyContent: "center",
        textAlign: 'center',
        fontSize: 20,
        color: "#304d50",
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
        padding: 10,
        flexDirection: 'row',
       
        
    },

    changeScore: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginBottom: 25,
    },
    playerName: {
        width: "40%",
        display: "flex",
        backgroundColor: "white",
        color: "#304d50",
        padding: 25,
        paddingBottom: 30,
        paddingTop: 35,
        marginTop: 10,
        fontSize: 16,
        alignItems: "flex-start",
        fontWeight: '700',
        borderRadius: 25,
        textAlign: 'center',    }
})