import React , {useState, useLayoutEffect, useEffect}from 'react'
import { View } from 'react-native'
import { StyleSheet, Button, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../firebase';
import {auth} from '../firebase.js';
import Leaderboard from '../components/Leaderboard.js';

const LeaderboardScreen = ({navigation}) => {

    const [scores, setScores] = useState([]);
    const [dataLoaded, setDataLoad] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Madison Course",
            headerTintColor: "white",
            headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                <TouchableOpacity activeOpacity = {0.5} onPress = {() => navigation.goBack()}>
                    <Text style = {styles.headerBack}> Back </Text>
                </TouchableOpacity>
                </View>)
        })
    }, [navigation]);

    useEffect(() => {
        

        if (dataLoaded == false){
            createChat();
        }
        
    
        
     }, [])

     // TODO: Running multiple times need to optimize 

     const createChat = async() => {
        await db
        .collection("leaderboard").doc("madison").collection("allscores").get().then((querySnapshot) => {
            var scores2 = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
               
              var score =doc.data().score;
              var player = doc.data().name;
              var tempObj ={};
   
              tempObj = {score, player};
              scores2.push(tempObj);
              //console.log(date);
              //dates.push(date);
              //scores.push()
              //console.log(scores);
   
              setScores({
                  data: scores2,
               });
   
           });
        })
        .then(() => {
            console.log("data returned");
            setDataLoad(true);
        })
        .catch(error => alert(error));

    }
    
    function renderLeaders(){
        
       if (scores['data'] != null && scores['data'].length > 3){
           
        return(
            <Leaderboard 
            data={scores["data"]} 
            sortBy='score' 
            labelBy='player'/>
        );
       }
    }
  return (
    <View>
        <View> 
          <Text style = {{color: "#304d50", padding: 15, fontWeight: "700", backgroundColor: "white"}}>Madison Course Leaderboard</Text> 
        </View>
        <View>
            {dataLoaded ? renderLeaders() : <Text> Loading </Text> }
        
        </View>
    </View>
  )
}

export default LeaderboardScreen


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#FFFFFF",
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
    },
})