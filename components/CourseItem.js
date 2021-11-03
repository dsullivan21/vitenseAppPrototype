import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements";
import {imagePlaceholder} from "../assets/icon.png";

const CourseItem = ({ id, courseName, hole, enterScore}) => {
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
            <ListItem.Subtitle numberOfLines = {1} ellipsizeMode = "tail">
                test Subtitle here test Subtitle here test Subtitle here
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CourseItem

const styles = StyleSheet.create({})