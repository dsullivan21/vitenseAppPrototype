import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import {auth} from '../firebase.js';
import { db } from '../firebase';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imgUrl, setImageUrl] = useState("");

    const register = () => {
       var promise = auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL:
                    imgUrl || '../assets/userIcon.png'
            }
            );
        }).catch((error)=> alert(error.message))

        promise.then(function () {
            var userUid = auth.currentUser.uid;
         //   var username = auth.currentUser.displayName;
            db.collection('scores').doc(userUid).set({
                name: name,
            })});

        };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back To Login",
        });
    }, [navigation]);
    return (
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
             <StatusBar style = "light" />
            <Text h3 style = {{marginBottom: 50}}>Create Account</Text>

            <View style = {styles.inputContianer}>  

                <View style={styles.emailContainer}>
                <Input 
                    placeholder = "Full Name"
                    autoFocus
                    type = "text"
                    value = {name} 
                    onChangeText = {(text)=>setName(text)}
                    inputContainerStyle={{borderBottomWidth:0}}
                />
                </View>
                <View style={styles.emailContainer}>
                <Input 
                    placeholder = "Email"
                    type = "text"
                    value = {email} 
                    onChangeText = {(text)=>setEmail(text)}
                    inputContainerStyle={{borderBottomWidth:0}}
                />
                </View>
                <View style={styles.emailContainer}>
                <Input 
                    placeholder = "Password"
                    type = "text"
                    value = {password} 
                    secureTextEntry
                    onChangeText = {(text)=>setPassword(text)}
                    inputContainerStyle={{borderBottomWidth:0}}
                />
                </View>

            </View>

            <TouchableOpacity style = {styles.button} onPress = {register}> 
            <Text style = {styles.text}>Register</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
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
    inputContianer:{
        width: 300,
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
    text:{
        color: "white",
        fontWeight: "700"
    },
})
