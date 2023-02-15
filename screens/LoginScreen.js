import React from 'react'
import {useEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Button, Image, Input} from 'react-native-elements'
import {KeyboardAvoidingView} from "react-native"
import { StatusBar } from 'expo-status-bar'
import logo from '../assets/vitenseLogo.png'; 
import {auth} from '../firebase.js';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error)=>alert(error));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    return (
        <KeyboardAvoidingView behavior = "padding" enabled style = {styles.container}>
            <StatusBar style = "light"> </StatusBar>
        
            <View style = {styles.imageContainer}>
            <Image source = {logo}
              style ={{width: 200, height:250, resizeMode: 'contain',}}/>
            </View>
            <View style ={styles.inputContainer}>
                <View style = {styles.emailContainer}>
                <Input style = {styles.input} placeholder ="Email" 
                    inputContainerStyle={{borderBottomWidth:0}}
                    value ={email} 
                    onChangeText ={(text)=>setEmail(text)}
                />
            </View>
            <View style = {styles.emailContainer}>
                <Input style = {styles.input} placeholder ="password" 
                    inputContainerStyle={{borderBottomWidth:0}}
                    secureTextEntry 
                    type ="Password" 
                    value ={password} 
                    onChangeText ={(text)=>setPassword(text)}
                    onSubmitEditing = {signIn}
                />
            </View>
            </View>

            <TouchableOpacity  onPress = {signIn} style = {styles.button}><Text style={styles.text}>Login</Text></TouchableOpacity>
            <TouchableOpacity raised={true} title = "Register" onPress = {() => navigation.navigate('Register')} type = "outline" style = {styles.button2} ><Text style={styles.text2}>Register</Text></TouchableOpacity>
            <View style = {{height: 100}}/>
        </KeyboardAvoidingView>
    ) 
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer:{
        width: 300,
        marginTop: 5,
        borderBottomWidth: 0,
    },
    imageContainer:{
        backgroundColor: "white",
       
    },
    input:{
        borderRadius: 10,
        color: "#304d50",
        padding: 5,
    },
    emailContainer: {
        alignItems: "center",
        height: 40,
        marginBottom: 15,
        backgroundColor: "white",
        shadowColor: '#304d50',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderRadius: 10
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 42,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#304d50',
        marginBottom: 15,
        shadowColor: '#304d50',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    button2:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        borderColor: '#304d50',
        marginBottom: 15,
        backgroundColor: "white",
        shadowColor: '#304d50',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    text:{
        color: "white",
        fontWeight: "700"
    },
    text2:{
        color: "#304d50",
        fontWeight: "700"
    }

});
