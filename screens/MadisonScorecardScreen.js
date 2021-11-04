import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import CourseItem from '../components/CourseItem'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { blue, white, bold } from 'ansi-colors';

const MadisonScorecardScreen = ({navigation}) => {

    const [scores, setScores] = useState([]);

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
            headerBackTitle: "Quit Round",
            headerTintColor: "white",
        })
    }, [navigation]);


    return (
        <ScrollView style = {styles.container}>
            {scores.map(( {id, data: {course}}) => (
                    <CourseItem key ={id} id = {id} courseName = {course} hole = {1} players = {global.players}/>
            ))}

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
    }
})