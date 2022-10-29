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

export default function SignIn({navigation}) {
  const [alert, setAlert] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

   function handleSignInSubmit() {
    //Code to SignIn using Email and Password
    account
    .createEmailSession(email,password)
    .then(() => navigation.replace("Dashboard"),
    (error) => setAlert(error.message));
   }

   function handlePasswordRecovery(){
      account
      .createRecovery(email,'http://localhost:19006/ResetPassword')
      .then(response => console.log(response),
      error => setError(error.message))
   }

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
          <Text style={{color:'red'}}>{error}</Text>
          <View style={{margin:10}}>
            <Button title="Send email" onPress={handlePasswordRecovery} />
          </View>
        </View>
      </Modal>

      <Text>{alert}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={nameEmail => setEmail(nameEmail)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={namePassword => setPassword(namePassword)}
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
