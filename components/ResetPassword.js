import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import * as Linking from 'expo-linking';
import account from '../config';

export default function ResetPassword({navigation}){
    const [password, setPassword] =useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentUrl,setCurrentUrl] =useState('');
    const [resetStatus, setResetStatus] =useState('');

    Linking.getInitialURL()
    .then(url => setCurrentUrl(url));

    async function handleResetPassword(){
        const url  = new URL(currentUrl);  
        const urlParams = new URLSearchParams(url.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');
        
        await account
        .updateRecovery(userId, secret, password, confirmPassword)
        .then( () => setResetStatus("Password changed Successfully."),
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
            <Text>{resetStatus}</Text>
            <View style={{flexDirection:'row'}} >
                <View>
                    <Button title="Reset Password" onPress={handleResetPassword}/>
                </View>
                <View style={{marginLeft:20}}>
                    <Button title="Back" onPress={() => navigation.replace('SignIn')}/>
                </View>
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
