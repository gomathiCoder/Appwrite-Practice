import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import account from '../config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({navigation}) {
  const [signInError, setSignInError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState('');
  const [recoveryError, setRecoveryError] = useState('');

   async function handleSignInSubmit() {
    //Code to SignIn using Email and Password
    await account
    .createEmailSession(email,password)
    .then(() => { AsyncStorage.setItem('isLoggedIn', 'yes')
      navigation.replace("Dashboard")},
    (error) => setSignInError(error.message));
   }

   async function handlePasswordRecovery(){
      await account
      .createRecovery(email,'http://localhost:19006/ResetPassword')
      .then(() => {
        setRecoveryError('');
        setRecoverySuccess("Reset password link sent to your mail id. Please check.")
      },
      error => setRecoveryError(error.message)
   )};

  return (
    <SafeAreaView style={styles.centerContainer}>
      <Modal visible={modalOpen}>
        <View style={[styles.centerContainer,{flex:1}]}>
          <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={nameEmail => setEmail(nameEmail)}
          keyboardType='email-address'
          />
          <Text style={{color:'green'}}>{recoverySuccess}</Text>
          <Text style={{color:'red'}}>{recoveryError}</Text>
          <View style={{flexDirection:'row', margin:10}}>
            <View>
              <Button title="Send email" onPress={handlePasswordRecovery} />
            </View>
            <View style={{marginLeft:20}}>
              <Button title="Back" onPress={() => setModalOpen(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Text>{signInError}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={Email => setEmail(Email)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={Password => setPassword(Password)}
        secureTextEntry
      />
  
      <TouchableOpacity onPress={()=> setModalOpen(true)}>
        <Text style={styles.smallText}>Forget Password?</Text>
      </TouchableOpacity>
      <View style={{margin:10}}>
        <Button title="Sign In" onPress={() => handleSignInSubmit()} />
      </View>
      <View style={{margin:10}}>
        <Button title="Sign Up" onPress={() => navigation.replace('SignUp')} />
      </View>
    </SafeAreaView>
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
  },
  smallText:{
    color:'red',
    textDecorationLine:'underline',
    textAlign:'left'
  }
});
