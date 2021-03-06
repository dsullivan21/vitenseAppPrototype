import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements";
import {imagePlaceholder} from "../assets/icon.png";
import Scorecard from './Scorecard';
import { TouchableOpacity } from 'react-native'

const CourseItem = ({ id, courseName, hole, players}) => {

    return (
        <ListItem key = {id} bottomDivider>
            <Avatar
                rounded
            >
            </Avatar>
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {courseName}
            </ListItem.Title>

            <Scorecard style={styles.scorecard} holeNum = {hole} players = {players} course = {courseName}/>
        
        </ListItem.Content>
        </ListItem>
    )
}

export default CourseItem

const styles = StyleSheet.create({
    scorecard:{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%"
    }
})