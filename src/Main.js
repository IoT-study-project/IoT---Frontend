import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, Platform, Pressable, View } from 'react-native';
import { url, setAuthToken } from '../config';
import * as SecureStore from 'expo-secure-store';

export default function MainInfo({ navigation }) {
  const [data, setData] = useState([]);

  const showData = async () => {
    let token;
    if (Platform.OS === 'web') {
      token = localStorage.getItem("token");
    }
    else {
      token = await SecureStore.getItemAsync('secure_token');
    }
    if (token) {
      setAuthToken(token);
    }
    else {
      alert('Zaloguj się ponownie (reload tokena)!');
      navigation.navigate('Login');
    }
    await axios.get(url + "get-last-data")
      .then(async res => {
        setData(res.data);
        navigation.navigate('Main');
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            alert('Error:', error.response.status);
          }
        } else if (error.request) {
          alert('No response received');
        } else {
          alert('Request setup error:', error.message);
        }
      });
  };

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem("token");
    }
    else {
      await SecureStore.deleteItemAsync('secure_token');
    }
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
      <Text style={styles.text}>Dane do wyświetlenia</Text>
      <Pressable style={styles.show} onPress={showData}>
        <Text style={styles.buttonText}>Pokaż info</Text>
      </Pressable>
      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Wyloguj</Text>
      </Pressable>
      <Text style={styles.text}>Dane</Text>
      <View style={styles.container}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.text}>Device ID: {item.device_id}</Text>
            <Text style={styles.text}>Sensor Data:</Text>
            <View style={styles.sensorDataContainer}>
              {Object.entries(item.sensor_data).map(([key, value]) => (
                <View key={key} style={styles.sensorItem}>
                  <Text style={styles.text}>{key}: {value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
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
  IoT: {
    fontSize: 30,
    marginBottom: 20,
  },
  text: {
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
  logout: {
    backgroundColor: 'red',
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
