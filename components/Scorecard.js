import React, {useState, useLayoutEffect, useEffect} from 'react'

import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

//Function holds the scorecard of the app

function Scorecard( { hole, players, par} ) {

    const [counter, setCounter] = useState(3)
  
    // Function is called everytime increment button is clicked
    // Handles score addition
    const increaseScore = () => {
      // Counter state is incremented
      setCounter(counter + 1)
    }
    
    // Function is called everytime decrement button is clicked
    const decreaseScore = () => {
      // Counter state is decremented
      setCounter(counter - 1)
    }

    return (
        
        <ScrollView style = {styles.container}>
            <View>
                <ListItem style= {styles.scoreGrid}> 
                    <Text>Hole: {hole}</Text>
                </ListItem>

            </View>
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
        </ScrollView>
    )
}

export default Scorecard

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