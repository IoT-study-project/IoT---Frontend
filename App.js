import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/Login';
import RegisterScreen from './src/Register';
import MainInfo from './src/Main';

const Stack = createNativeStackNavigator();

export default function App() {
  // var cors = require('cors')
  // App.use(cors())
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}