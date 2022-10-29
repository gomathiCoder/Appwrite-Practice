import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import * as Linking from 'expo-linking';
import account from '../config';

export default function ResetPassword(){
    const [password, setPassword] =useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentUrl,setCurrentUrl] =useState('');

    Linking.getInitialURL()
    .then(url => setCurrentUrl(url));

    function handleResetPassword(){
        const url  = new URL(currentUrl);  
        const urlParams = new URLSearchParams(url.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');
        
        account
        .updateRecovery(userId, secret, password, confirmPassword)
        .then(response => console.log(response),
        error => console.log(error.message));
    }

    return(
        <View style={styles.centerContainer}>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                secureTextEntry
            />
            <View style={{margin:10}}>
                <Button title="Reset Password" onPress={handleResetPassword}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        width: 300,
      }
})
