import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity, Alert } from 'react-native'
import CourseItem from '../components/CourseItem'
import { db } from '../firebase';
import {auth} from '../firebase.js';
import { Ionicons } from '@expo/vector-icons'; 
import miniexample from '../assets/miniexample.png'
import HomeScreen from './HomeScreen';

const MadisonScorecardScreen = ({navigation}) => {

    const [scores, setScores] = useState([]);
    const [holeCount, setHoleCount] = useState(1);
    const [buttonText, setButtonText] = useState("Next Hole");
    const course = "Madison";

    console.log(holeCount);
    useEffect(() => {
       const unsubscribe = db.collection('scores').onSnapshot(snapshot=>( setScores(snapshot.docs.map( doc => ({
           id: doc.id,
           data: doc.data(),
       })))
       )
       );
       

       return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Madison Course",
            headerTintColor: "white",

            headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                <TouchableOpacity activeOpacity = {0.5} onPress = {createTwoButtonAlert}>
                    <Text style = {styles.headerBack}> Quit Round </Text>
                </TouchableOpacity>
                </View>)
        })
    }, [navigation]);

    function nextHole() {
        setHoleCount(holeCount + 1);
    }

    function endRound(){
        console.log("round ended");
        navigation.navigate("RoundRecap");
    }

    function viewCard(){
        navigation.navigate("Scorecard", { courseName: course });
    }

    const createTwoButtonAlert = () =>
        Alert.alert('Quit Round?', 'Are you sure you want to quit round? Scores will not be saved', [
        {
            text: 'No',
            onPress: () => console.log('Cancelled'),
            style: 'cancel',
        },
        { text: 'Yes', onPress: () => {
            const user = auth.currentUser;
            var userUID = user.uid;
            console.log(global.timestamp);
            db.collection("scores").doc(userUID).collection("madisonCourse").doc(global.timestamp).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            navigation.navigate("Home")}},
    ]);


    return (
        <ScrollView style = {styles.container}>
        
        <View style = {styles.course}>
        <CourseItem key ={1} id = {1} courseName = {course} hole = {holeCount} players = {global.players}/>
        </View>
        <View style = {styles.footer}> 

            <TouchableOpacity onPress={viewCard} style = {styles.button}> 
                <Text style = {styles.buttonText}> Scorecard </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                console.log(holeCount);
                if (holeCount <= 18){
                    nextHole();
                }
                if (holeCount == 17){
                    setButtonText("End Round");
                }else if (holeCount == 18){
                    endRound();
                }
                }} style = {styles.button}> 
                <Text style = {styles.buttonText}> {buttonText} </Text>
            </TouchableOpacity>

            
        </View>
        </ScrollView>
    )
}

export default MadisonScorecardScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#FFFFFF",
    },
    headerStyle: {
        fontWeight: "600", 
        backgroundColor: "white", 
        color: "black",
        paddingBottom: 10,
        paddingTop: 10,
    },
    headerBack:{
        color:"white",
    },
    course:{
        width: "100%",
    },
    button:{
        backgroundColor: "white",
        padding: 15,
        display: "flex",
        justifyContent: "space-evenly",
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,  
    },
    buttonText: {
        fontWeight:"500",
        textAlign:"center",
        color: "#304d50",
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})