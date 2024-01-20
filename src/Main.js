import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { url, setAuthToken } from '../config';

export default function MainInfo({ navigation }) {
  // const [mail, setMail] = useState('');
  const [data, setData] = useState([]);

  const showData = async () => {
    // alert(`Tutaj powinny być Twoje dane`);
    // navigation.navigate('Login');
    // console.log('Pobieram dane' + await AuthHeader());
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setAuthToken(token);
    }
    else {
      alert('Zaloguj się ponownie (reload tokena)!');
      navigation.navigate('Login');
    }
    const res = await axios.get(url + "get-last-data");
    console.log(res);
    console.log('SUCCESS: ', res.data);
    setData(res.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
      <Text style={styles.text}>Dane do wyświetlenia</Text>
      {/* <Text>Wprowadź nazwę użytkownika:</Text> */}
      <TouchableOpacity style={styles.show} onPress={showData}>
        <Text style={styles.buttonText}>Pokaż info</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Dane</Text>
      <ul style={styles.text}>
        {data.map((item, index) => (
          <li key={index} style={styles.text}>
            <p>Device ID: {item.device_id}</p>
            <p>Sensor Data:</p>
            <ul>
              {Object.entries(item.sensor_data).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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
    // position:fixed,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
