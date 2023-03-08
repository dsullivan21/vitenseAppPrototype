import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, Button, ScrollView, Image } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity, Modal,TouchableHighlight } from 'react-native'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import SwipeableViews from 'react-swipeable-views';
import logo from '../assets/vitenseLogo.png'


const AddChatScreen = ({navigation}) => {

   /* <Input
    placeholder = "add chat"
    value = {input}
    onChangeText = {(text) => setInput(text)}
    leftIcon = {
        <Icon name = "wechat" type = "antdesign" size={24} color="black"></Icon>
    }
/>

<Button onPress = {createChat} title = "Create New Chat" />

*/

    //set global variable to keep track of players
    global.players;

    const [input, setInput] = useState("");
    const createChat = async() => {
        await db
        .collection("chats")
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack()
        })
        .catch(error => alert(error));
    }

    const goToMadison = () => {
        console.log(global.players);
        navigation.navigate('MadisonScreen');
    }

    const viewHistory = () => {
        navigation.navigate("History");
    }

    const viewLeaderboard = () => {
        navigation.navigate("Leaderboard");
    }

useLayoutEffect(() => {
    navigation.setOptions({
        title: "Select Your Course",
        headerTintColor: "white",
        headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                  <TouchableOpacity activeOpacity = {0.5} onPress = {() => navigation.goBack()}>
                      <Text style = {{color: "white", fontWeight: "800"}}>  Back </Text>
                  </TouchableOpacity>
                  </View>)
    })
}, [navigation]);


const [modalVisible, setModalVisible] = useState(false);


    return (
        <ScrollView style = {styles.container}>

            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row", display:"flex", justifyContent:"center", marginBottom: 10}}>
                    <Ionicons name="golf" size={24} color="#304d50" />
                    <Text h4 style = {styles.optionText}>Madison Course</Text> 
                </View>
                <Image source={logo} resizeMode="contain" style={styles.image}/>
                <View style= {{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity  activeOpacity = {0.5} onPress={() => {
                        goToMadison();
                    }}> 
                        <Text h5 style = {styles.courseOptions}>Enter Scores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity = {0.5} onPress = {viewHistory}> 
                        <Text h5 style = {styles.courseOptions}>View History</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity  activeOpacity = {0.5} onPress = {viewLeaderboard} style = {{maxWidth: "70%", marginLeft: "auto", marginRight: "auto"}}> 
                        <Text h5 style = {styles.courseOptions}>View Leaderboard</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row", display:"flex", justifyContent:"center", marginBottom: 10}}>
                    <Ionicons name="golf" size={24} color="#304d50" />
                    <Text h4 style = {styles.optionText}>Wisconsin Course</Text> 
                </View>
                <Image source={logo} resizeMode="contain" style={styles.image}/>
                <View style= {{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>Enter Scores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>View History</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row", display:"flex", justifyContent:"center", marginBottom: 10}}>
                    <Ionicons name="golf" size={24} color="#304d50" />
                    <Text h4 style = {styles.optionText}>California Course</Text> 
                </View>
                <Image source={logo} resizeMode="contain" style={styles.image}/>
                <View style= {{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>Enter Scores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>View History</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row", display:"flex", justifyContent:"center", marginBottom: 10}}>
                    <Ionicons name="golf" size={24} color="#304d50" />
                    <Text h4 style = {styles.optionText}>Par 3 Course</Text> 
                </View>
                <Image source={logo} resizeMode="contain" style={styles.image}/>
                <View style= {{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>Enter Scores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity = {0.5} > 
                        <Text h5 style = {styles.courseOptions}>View History</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: null,
        height: null,
        marginTop: 5,
      },
    playerCount: {
        height: 50,
        width: 50,
        marginLeft: 20,
        marginBottom: 30,
    },
    modalView: {
        height: "20%",
        width: "80%", 
        backgroundColor: "white", 
        shadowColor: 'gray',
        shadowOffset: { width: 3, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 2, 
        borderWidth: 1,
        borderColor: "lightgray",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        height: 50,
      },
    courseList: {
        width: "100%",
        backgroundColor: "white",
        shadowColor: '#304d50',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 2, 
        padding: 30,
        marginBottom: 15,
        borderRadius: 5,
        height: 270,
    },
    optionText: {
        marginLeft: 10,
        textAlign: "center",
        fontWeight: "700",
        color: "#304d50"
    },
    courseOptions: {
        marginTop: 10,
        backgroundColor: "white",
        color: "#304d50",
        padding: 10,
        marginLeft: 10,
        fontWeight: "bold",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#304d50",
        borderRadius: 5,
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
      },
      slide1: {
        backgroundColor: '#FEA900',
      },
      slide2: {
        backgroundColor: '#B3DC4A',
      },
      slide3: {
        backgroundColor: '#6AC0FF',
      },

})
