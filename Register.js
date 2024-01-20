import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [mail, setMail] = useState('');

    const verifyData = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
            <Text style={styles.text}>Rejestracja użytkownika</Text>
            <Text>Wprowadź nazwę użytkownika:</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Nazwa użytkownika"
            />
            <Text>Wprowadź hasło:</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Hasło"
            />
            <TouchableOpacity style={styles.buttonRegister} onPress={verifyData}>
            <Text style={styles.buttonText}>Zarejestruj się</Text>
            </TouchableOpacity>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    IoT:{
      // position:fixed,
      fontSize: 30,
      marginBottom: 20,
    },
    text:{
        fontSize: 24,
        marginBottom: 10,
    },  
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      width: '100%',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonRegister: {
      backgroundColor: 'gray',
      margin: 10,
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
