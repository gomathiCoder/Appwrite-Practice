import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button} from 'react-native';
import account from "../config/index";

export default function Dashboard({navigation}){

    const [user, setUser] = useState('');

    useEffect(() => {
        getUserName()
        return 
    },[]);

    async function getUserName(){
        await account.get()
        .then(response=> setUser(response.name),
        error => console.log(error.message))
    };
    
    function handleSignOutSubmit(){
        account
        .deleteSession('current')
        .then(() => {
            AsyncStorage.setItem('isLoggedIn', 'no')
            navigation.replace("SignIn")
        },
        error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text>Welcome {user}</Text>
            <View style={{margin:10}}>
        <Button title="Sign Out" onPress={() => handleSignOutSubmit()} />
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})