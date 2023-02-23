import React, {useState, useLayoutEffect, useEffect} from 'react'
import { db } from '../firebase';
import {auth} from '../firebase.js';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'

//Recap of the Round display

const RoundRecapScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Round Recap",
            headerTintColor: "white",
            headerLeft: null,
        })
    }, [navigation]);

    var docRef = db.collection("madison").doc("par");
    const [scores, setScores] = useState({data: []});
    const [par, setPar] = useState({data: []});
    const [player, setPlayer] = useState(null);

    var totalScore = 0;
    var evenRound = 0; 
    var scorevspar = 0;
    var birdies = 0;
    var pars = 0;
    var eagles = 0;
    var bogeys = 0;
    
    var formatted = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(global.timestamp);
        
    function loadPar(){
        docRef.get().then((doc) => {
            if (doc.exists ) {
                //console.log("Document data:", doc.data());
                var parObj = doc.data();
                //get par data as array
                var parList = Object.values(parObj);
               // var holeList = Object.keys(parObj);
                console.log(parList);
                setPar({
                    id: doc.id,
                    data: parList,
                })
                
                return true;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
        return false;
    }

    //load score data from current round

    function loadScore(){

        var userUid = auth.currentUser.uid;
        //console.log(global.timestamp);
        if (userUid != null){

            var scores1, playerName;
            var docRef = db.collection('scores').doc(userUid).collection('madisonCourse').doc(global.timestamp);

            docRef.get().then((doc) => {
            if (doc.exists) {
              //  console.log("Document data:", doc.data());
                scores1 = doc.data().hole;
                playerName = doc.data().player;
                setScores({
                    id: doc.id,
                    data: scores1,
                });
                setPlayer({
                    id: doc.id,
                    data: playerName
                });

                

            } else {

                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }   

    useEffect(() => {
       
        loadPar();
        loadScore();
     }, [])


     function writeToLeaderboard(){
        if (scores != null && player != null){
            var totalScore = 0;
            var playerName = player['data'];
            for (let i = 0;  i < scores["data"].length; i++){
                totalScore = totalScore + scores["data"][i];
            }

            db.collection("leaderboard").doc("madison").collection("allscores").add({
                name: playerName,
                score: totalScore,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

                
        }
        global.timestamp = "";
     }
     function combineScore() {
         pars = 0;
         birdies =0;
         bogeys = 0;
         eagles = 0;

        if (scores["data"] != null && par["data"]!= null){

            for (let i = 0; i < scores["data"].length; i++){
                totalScore = totalScore + scores["data"][i];


                if (scores["data"][i] == par["data"][i]){
                   pars = pars + 1;
                }
                else if ((par["data"][i] + 1) == scores["data"][i] ){
                    bogeys = bogeys +1;
                }
                else if ((par["data"][i] -1)  == scores["data"][i] ){
                   birdies = birdies + 1;
                }
                else if ((par["data"][i]-2) == scores["data"][i]){
                    eagles = eagles +1;
                }
            }

            for (let i = 0; i <  par["data"].length; i++){
                evenRound = evenRound +  par["data"][i];
            }

            scorevspar = totalScore - evenRound;
            console.log(scorevspar , "scores");

            
        }

     }


     function getStyle(){

        if (scorevspar < 0){

            return{
                fontWeight: "900", 
                fontSize: 24, 
                color: "#880808",
                textAlign: "center",
                paddingRight: 10
            }
            
        }
        else if(scorevspar >= 0){
            return{
                fontWeight: "900", 
                fontSize: 24, 
                color: "#304d50",
                textAlign: "center",
                paddingRight: 10
            }
        }
     }
     
     combineScore();


  return (
      <ScrollView>
           
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{color: "#304d50", fontWeight: "700", fontSize: 20 }}> Round on {formatted} </Text>
            </View>
            <View style = {styles.cardContainer}>
                    <Text style = {styles.header2} > Overall </Text>
                <View style = {styles.combineScore}>
                    {(scorevspar > 0) ? <Text style = {getStyle()}> + {scorevspar}</Text> : <Text style = {getStyle()}> {scorevspar}</Text>}
                </View> 

                <View style = {styles.otherHeader}> 
                <Text style = {styles.header3} > Total Strokes </Text>
                <Text style = {styles.header3} > Course Par </Text>
                </View>

                <View style= {styles.otherScore}> 

                
                <View style = {styles.overall}>
                    <Text style = {styles.roundScore}> {totalScore} </Text>
                </View> 

                
                <View  style = {styles.overallPar}>
                    <Text style = {styles.parScore}> {evenRound} </Text>
                </View> 

                </View>

                <View style = {styles.otherHeader}> 
                <Text style = {styles.header4} > Eagles </Text>
                <Text style = {styles.header4} > Birdies </Text>
                <Text style = {styles.header4} > Pars </Text>
                <Text style = {styles.header4} > Bogeys </Text>
                </View>

                <View style= {styles.otherScore}> 

                
                <View style = {styles.overall2}>
                    <Text style = {styles.roundScore}> {eagles} </Text>
                </View> 

                
                <View  style = {styles.overall2}>
                    <Text style = {styles.parScore}> {birdies} </Text>
                </View> 

                <View  style = {styles.overall2}>
                    <Text style = {styles.parScore}> {pars} </Text>
                </View> 

                <View  style = {styles.overall2}>
                    <Text style = {styles.parScore}> {bogeys} </Text>
                </View> 

                </View>
            </View>

            <View style = {styles.buttonContainer}> 
                <TouchableOpacity style = {styles.return} onPress = {() => {writeToLeaderboard(); navigation.navigate('Home')}}> 
                    <Text style = {{color: "#304d50", fontWeight: "700"}}> Return Home</Text>
                </TouchableOpacity>
            </View>

        </View>

       

      </ScrollView>
   
  )
}

export default RoundRecapScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        minHeight: "100%",
    },
    header: {
        marginTop: 25,
        marginBottom: 25,
    },
    otherHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    scoreText: {
        alignItems: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20
    },
    otherScore: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center"
    },
    roundScore: {
        marginBottom: 15,
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        color: "#304d50",
        fontWeight: "800",
        paddingTop: 10
    },
    parScore:{
        marginBottom: 15,
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "800",
        color: "#304d50",
        paddingTop: 10
    },
    return:{
        padding: 25,
        borderRadius: 10,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        backgroundColor: "white",
    },

    header2: {
        color: "#304d50",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
    },
    header3: {
        color: "#304d50",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
        width: "50%"
    },

    header4: {
        color: "#304d50",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 15,
        width: "25%",
        marginTop: 15
    },

    overall:{ 
        width: "45%",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        marginRight: 10
    },
    overall2: {
        width: "20%",
        padding: 5,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        marginRight: 15
    },

    overallPar: {
        width: "45%",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        marginRight: 10
    },

    cardContainer: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        backgroundColor: "white",
        minHeight: "50%",
        maxWidth: "90%"
    },

    scoreText: {
        
    },

    combineScore: {
        marginBottom: 15,
        width: "50%",
        padding: 30,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#c6c6c6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
    }
})