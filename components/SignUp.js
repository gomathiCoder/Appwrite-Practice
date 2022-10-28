import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import account from '../config/index';

export default function SignUp({navigation}){
    const [alert, setAlert] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(){
        //Code to SignUp for new Account
        account
        .create(name,email,password,name)
        .then((response) => {
            if(response.status){
                Alert.alert(
                    "Success",
                    "User account is created Successfully. Please SignIn",
                    [{
                        text:"OK",
                        onPress:(() => navigation.replace("SignIn"))
                    }]
                )
            }
        },
        (error) => {
            setAlert(error.message);
        });

    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>{alert}</Text>
                <TextInput 
                placeholder='Name'
                style={styles.input}
                onChangeText={name => setName(name)}
                />
                <TextInput 
                placeholder='Email'
                style={styles.input}
                onChangeText={email => setEmail(email)}
                keyboardType='email-address'
                />
                <TextInput 
                placeholder='Password'
                style={styles.input}
                onChangeText={password => setPassword(password)}
                secureTextEntry
                />
                <Button title='SignUp' onPress={() => handleSubmit()}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        width: 300,
      },
  });