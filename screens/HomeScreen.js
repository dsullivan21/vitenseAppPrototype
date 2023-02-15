import React,{useEffect, useState, useLayoutEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Text, Image } from 'react-native-elements'
import { TouchableOpacity, Alert } from 'react-native'
import { auth, db } from '../firebase'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import logo from '../assets/vitenseLogo.png'
import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const [images, setImages] = React.useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?tree",
    ]);


    const createTwoButtonAlert = () =>
        Alert.alert('Opening Scanner', 'Please Scan QR Code at your location to order food with Toast', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancelled'),
            style: 'cancel',
        },
        { text: 'Continue to Scanner', onPress: () => navigation.navigate("QRScanner")},
    ]);

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
            headerTintColor:  "#304d50",
            headerTitle: () => (
                <View style = {{flexDirection: "row", alignItems: 'center',}}> 
                    <Image source = {logo} style ={{width: 80, height: 80, marginBottom: 10, resizeMode: 'contain'}} />
                </View>
                
            ),
            headerLeft: () => (<View style={{ marginLeft: 20, flexDirection: "row", alignItems: 'center' }}> 
                <TouchableOpacity activeOpacity = {0.5} onPress = {signOutUser}>
                    <FontAwesome name="user-o" size={25} color="#304d50" />
                </TouchableOpacity>
            </View>),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}> 
                    <TouchableOpacity activeOpacity = {0.5} onPress = {() => createTwoButtonAlert() }>
                        <Ionicons name="fast-food-outline" size={30} color="#304d50" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigation.navigate("AddChat")} activeOpacity = {0.5}>
                        <MaterialIcons name="sports-golf" size={35} color="#304d50" />                   
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        <ScrollView>
            <SliderBox 
                images={images}
                sliderBoxHeight={400}
                dotColor="#a7d7c3"
                inactiveDotColor="#90A4AE"  
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                paginationBoxVerticalPadding={20}
                circleLoop
            />
            <Text h3 style={styles.headerStyle} > Recent Vitense News</Text>
            <ScrollView style = {styles.container}>
                {chats.map(( {id, data: {chatName}}) => (
                    <CustomListItem key ={id} id = {id} chatName = {chatName}/>
                ))}
            </ScrollView>
        </ScrollView>
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
