import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';
import account from "../config/index";

export default function Dashboard({navigation}){
    
    function handleSignOutSubmit(){
        account
        .deleteSession('current')
        .then(response => {
            if(!response.message){
                navigation.replace("SignIn");
            }
        },
        error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to Dashboard</Text>
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