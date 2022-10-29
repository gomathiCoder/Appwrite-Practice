import React, {useState, useEffect} from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import {Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const prefix = Linking.createURL('/');

function App() {
  const linking = {
    prefixes : [prefix],
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading ...</Text>}>
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Dashboard' component={Dashboard} />
      <Stack.Screen  name='ResetPassword' component={ResetPassword}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;