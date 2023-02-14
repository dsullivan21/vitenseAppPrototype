import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements';
import { TouchableOpacity, Modal,TouchableHighlight } from 'react-native'
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import SwipeableViews from 'react-swipeable-views';


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

useLayoutEffect(() => {
    navigation.setOptions({
        title: "Select Your Course",
        headerBackTitle: "Home",
        headerTintColor: "white",
    })
}, [navigation]);

const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView style = {styles.container}>

            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row"}}>
                    <Ionicons name="golf" size={24} color="black" />
                    <Text h4 style = {styles.optionText}>Madison Course</Text> 
                </View>
                <View style= {{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity  activeOpacity = {0.5} onPress={() => {
                        goToMadison();
                    }}> 
                        <Text h5 style = {styles.courseOptions}>Enter Scores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity = {0.5} onPress = {goToMadison}> 
                        <Text h5 style = {styles.courseOptions}>View History</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.courseList}>
                <View style = {{ flexDirection: "row"}}>
                    <Ionicons name="golf" size={24} color="black" />
                    <Text h4 style = {styles.optionText}>Wisconsin Course</Text> 
                </View>
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
                <View style = {{ flexDirection: "row"}}>
                    <Ionicons name="golf" size={24} color="black" />
                    <Text h4 style = {styles.optionText}>California Course</Text> 
                </View>
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
                <View style = {{ flexDirection: "row"}}>
                    <Ionicons name="golf" size={24} color="black" />
                    <Text h4 style = {styles.optionText}>Par 3 Course</Text> 
                </View>
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
        padding: 30,
        height: "100%"
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
        borderColor: "lightgray",
        borderWidth: 1,
        padding: 30,
        marginBottom: 15,
        borderRadius: 5,
    },
    optionText: {
        marginLeft: 10,
    },
    courseOptions: {
        marginTop: 10,
        backgroundColor: "white",
        color: "green",
        padding: 15,
        marginLeft: 10,
        fontWeight: "bold",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "green",
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
