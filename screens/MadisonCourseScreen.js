
import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { blue, white, bold } from 'ansi-colors';



const MadisonCourseScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Madison Course",
            headerBackTitle: "Courses",
            headerTintColor: "white",
        })
    }, [navigation]);

   // const store = createStore();

    const addRound = (e) => {
        e.preventDefault();

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const scoreRef = db.collection("scores").add({
            course: this.state.course,
            players: this.state.players
        });  

        this.setState({
            course: "",
            players: [],
        });

    }

    let list = [];
    for (let i = 0; i < global.players; i++){
        list.push(<Input key = {i} style = {styles.enterPlayers}inputContainerStyle={{borderBottomWidth:0}} placeholder = "Player Name"/>);
    }
    global.players = 0;
   

    return (
        <ScrollView style = {styles.container}>
            <Text style = {styles.courseHeader}> Madison Course </Text>
            {list}
            <TouchableOpacity
                    activeOpacity = {0.5}
                    style = {styles.submitPlayers}
                    onPress={() => {
                        addRound
                        navigation.navigate("MadisonScoreCard");
                }}>
                    <Text>Start Round</Text> 
                </TouchableOpacity>
        </ScrollView>
    )
}

export default MadisonCourseScreen

const styles = StyleSheet.create({
    courseHeader: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },

    enterPlayers: {
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 4,
        width: "90%",
        borderBottomWidth: 0,
        height: "30%",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
    },
    submitPlayers: {
        backgroundColor: "lightgreen",
        padding: 15,
        marginTop: 5,
        color: "white",
        fontWeight: "bold",
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        width: "70%",
        borderRadius: 5,
    }

})
