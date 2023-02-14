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
        <ListItem key = {id}  style={styles.cardContainer}>
            <Avatar
                rounded
            >
            </Avatar>
        <ListItem.Content bottomDivider>
            <ListItem.Title style={{fontWeight:"800"}}>

            </ListItem.Title>

            <Scorecard style={styles.scorecard} holeNum = {hole} players = {players} course = {courseName}/>
        
        </ListItem.Content>
        </ListItem>
        </ScrollView>
    )
}

export default CourseItem

const styles = StyleSheet.create({
    scorecard:{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%"
    },
    cardContainer: {
        height: "100%",
    }
})