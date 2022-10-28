import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View
} from 'react-native';

export default function SignIn({navigation}) {
  const [alert, setAlert] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   function handleSignInSubmit() {
    //Code to SignIn using Email and Password
   }

  return (
    <SafeAreaView style={styles.centerContainer}>
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
});
