import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MainInfo({navigation}) {
    // const [mail, setMail] = useState('');

    const showData = () => {
        alert(`Tutaj powinny być Twoje dane`);
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
            <Text style={styles.text}>Dane do wyświetlenia</Text>
            {/* <Text>Wprowadź nazwę użytkownika:</Text> */}
            <TouchableOpacity style={styles.show} onPress={showData}>
            <Text style={styles.buttonText}>Pokaż info</Text>
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
    show: {
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
