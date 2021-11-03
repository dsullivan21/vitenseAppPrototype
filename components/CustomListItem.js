import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements";
import {imagePlaceholder} from "../assets/icon.png";

const CustomListItem = ({ id, chatName, enterChat}) => {
    return (
        <ListItem key = {id} bottomDivider>
            <Avatar
                rounded
                source={{uri: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"}}
            >
            </Avatar>
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines = {1} ellipsizeMode = "tail">
                test Subtitle here test Subtitle here test Subtitle here
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
