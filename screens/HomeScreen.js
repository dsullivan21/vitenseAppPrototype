import React,{useEffect, useState, useLayoutEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Text, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import logo from '../assets/vitenseLogo.png'

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
       const unsubscribe = db.collection('chats').onSnapshot(snapshot=>( setChats(snapshot.docs.map( doc => ({
           id: doc.id,
           data: doc.data(),
       })))
       )
       );

       return unsubscribe;
    }, [])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    }
    useLayoutEffect(() => { 
        navigation.setOptions({
            title: "Vitense Home",
            headerStyle: {backgroundColor: "white", height: 100}, 
            headerTintColor:  "green",
            headerTitle: () => (
                <View style = {{flexDirection: "row", alignItems: 'center',}}> 
                    <Image source = {logo} style ={{width: 60, height: 60, marginBottom: 10}} />
                </View>
                
            ),
            headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                <TouchableOpacity activeOpacity = {0.5} onPress = {signOutUser}>
                    <FontAwesome name="user-o" size={25} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style = {{marginLeft: 20}} activeOpacity = {0.5} >
                    <Ionicons name="notifications-outline" size={30} color="green" />
                </TouchableOpacity>
            </View>),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}> 
                    <TouchableOpacity activeOpacity = {0.5}>
                        <Ionicons name="fast-food-outline" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigation.navigate("AddChat")} activeOpacity = {0.5}>
                        <MaterialIcons name="sports-golf" size={35} color="green" />                   
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        <SafeAreaView>
            <Text h3 style={styles.headerStyle} > Your Recent Activity</Text>
            <ScrollView style = {styles.container}>
                {chats.map(( {id, data: {chatName}}) => (
                    <CustomListItem key ={id} id = {id} chatName = {chatName}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    headerStyle: {
        fontWeight: "600", 
        backgroundColor: "white", 
        color: "black",
        paddingBottom: 10,
        paddingTop: 10,
    }
})
