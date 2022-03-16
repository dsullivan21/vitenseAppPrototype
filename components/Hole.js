import React from 'react'
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

const Hole = ({ id, courseName, hole, players}) => {
    return (
        <ListItem.Content style = {styles.scoreGrid}>
                <ListItem style = {styles.scorecardGrid}>
                    <TouchableOpacity style = {styles.addScore} onPress={
                        increaseScore
                    }>
                    <Text> Increase Score</Text>
                    </TouchableOpacity>
                </ListItem>
            
                <ListItem>
                    <Text style = {styles.score}>{counter}</Text>
                </ListItem>

                <ListItem style = {styles.scorecardGrid}>
                    <TouchableOpacity style = {styles.removeScore} onPress={
                        decreaseScore
                    }>
                    <Text> Decrease Score</Text>
                    </TouchableOpacity>
                </ListItem>
            </ListItem.Content>
    )
}

export default Hole


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        marginLeft: 0,
        },
    headerStyle: {
        fontWeight: "600", 
        backgroundColor: "white", 
        color: "black",
        paddingBottom: 10,
        paddingTop: 10,
    },
    addScore:{
        display: "flex",
        flexDirection: "row",
    },
    decreaseScore:{
        display:  "flex",
        flexDirection: "row",
    },
    score:{
        display: "flex",
        flexDirection: "row",
  
    },
    scoreGrid: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
})
