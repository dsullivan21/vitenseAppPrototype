import React from 'react'
import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native'
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
        
            <Image source = {logo}
              style ={{width: 200, height: 200, marginBottom: 5}}/>

            <View style ={styles.inputContainer}>
                <Input placeholder ="Email" 
                    value ={email} 
                    onChangeText ={(text)=>setEmail(text)}
                />

                <Input placeholder ="password" 
                    secureTextEntry 
                    type ="Password" 
                    value ={password} 
                    onChangeText ={(text)=>setPassword(text)}
                    onSubmitEditing = {signIn}
                />
            </View>

            <Button raised={true} title = "Login" onPress = {signIn} containerStyle = {styles.button}></Button>
            <Button raised={true} title = "Register" onPress = {() => navigation.navigate('Register')} type = "outline" containerStyle = {styles.button} ></Button>
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
    },
    button:{
        borderColor: "green",
        width:200,
        marginTop: 10,
    },

});
