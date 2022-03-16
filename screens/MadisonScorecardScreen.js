import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity, Alert } from 'react-native'
import CourseItem from '../components/CourseItem'
import { db } from '../firebase';
import {auth} from '../firebase.js';
import { Ionicons } from '@expo/vector-icons'; 
import { blue, white, bold } from 'ansi-colors';
import HomeScreen from './HomeScreen';

const MadisonScorecardScreen = ({navigation}) => {

    const [scores, setScores] = useState([]);
    const [holeCount, setHoleCount] = useState(1);
    const course = "Madison";

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
            
            <CourseItem key ={1} id = {1} courseName = {course} hole = {holeCount} players = {global.players}/>
    
            <TouchableOpacity onPress={nextHole}> 
                <Text> Next Hole </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default MadisonScorecardScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%"
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
    }
})