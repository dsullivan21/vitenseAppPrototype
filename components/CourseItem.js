import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements";
import {imagePlaceholder} from "../assets/icon.png";
import Scorecard from './Scorecard';
import { TouchableOpacity } from 'react-native'

const CourseItem = ( {id, courseName, hole, players}) => {

    console.log("hole", hole);
    return (
        <ScrollView>
            <Scorecard holeNum = {hole} players = {players} course = {courseName}/>
        </ScrollView>
    )
}

export default CourseItem

const styles = StyleSheet.create({
    scorecard:{
        display: "flex",
        justifyContent: "flex-start",
        width: "90%",
        shadowColor: "#a7d7c3",
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    cardContainer: {
        height: "100%",
    }
})