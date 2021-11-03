import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import {auth} from '../firebase.js';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imgUrl, setImageUrl] = useState("");

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL:
                    imgUrl || '../assets/userIcon.png'
            });
        }).catch((error)=> alert(error.message))
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

                <Input 
                    placeholder = "Full Name"
                    autoFocus
                    type = "text"
                    value = {name} 
                    onChangeText = {(text)=>setName(text)}
                />
                <Input 
                    placeholder = "Email"
                    type = "text"
                    value = {email} 
                    onChangeText = {(text)=>setEmail(text)}
                />
                <Input 
                    placeholder = "Passowrd"
                    type = "text"
                    value = {password} 
                    secureTextEntry
                    onChangeText = {(text)=>setPassword(text)}
                />
                 <Input 
                    placeholder = "Image Url"
                    type = "text"
                    value = {imgUrl} 
                    secureTextEntry
                    onChangeText = {(text)=>setImageUrl(text)}
                />

            </View>

            <Button 
                containerStyle = {styles.button}
                raised
                onPress = {register}
                title = "Register"
            />

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
        width: 200,
        marginTop: 10,
    },
    inputContianer:{
        width: 300,
    }
})
