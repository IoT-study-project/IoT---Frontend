import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, Pressable, View, Platform } from 'react-native';
import { password_validation, username_validation, findInputError, isFormInvalid } from './inputValidation';
import { FormProvider, useForm, Controller, set } from 'react-hook-form'
import { url, setAuthToken } from '../config';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const responseBody = {
    "username": "",
    "jwtToken": ""
  }
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)

  const handleLogin = async (data) => {
    const errors = methods.formState.errors;
    if (isFormInvalid(errors)) {
      const usernameError = findInputError(errors, 'username');
      const passwordError = findInputError(errors, 'password');
      return;
    }

    await axios.post(url + "login", data)
    .then(async JWTtoken => {
      // console.log(JWTtoken);
      if (Platform.OS === 'web') {
        localStorage.setItem("token", JWTtoken.data.token);
      }
      else {
        await SecureStore.setItemAsync('secure_token', JWTtoken.data.token);
      }
      navigation.navigate('Main');
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Niepoprawne hasło")
        } else if (error.response.status === 404) {
          alert('Nie znaleziono użytkownika');
        } else {
          alert('Error:', error.response.status);
        }
      } else if (error.request) {
        alert('No response received');
      } else {
        alert('Request setup error:', error.message);
      }
    });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleMain = async () => {
    let token;
    if (Platform.OS === 'web') {
      token = localStorage.getItem("token");
    }
    else {
      token = await SecureStore.getItemAsync('secure_token');
    }
    if (token) {
      setAuthToken(token);
      navigation.navigate('Main');
    }
    else {
      alert('Zaloguj się ponownie (reload tokena)!');
    }
  }

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
        <Pressable style={styles.buttonRegister} onPress={handleMain}>
          <Text style={styles.buttonText}>Przejdź do danych</Text>
        </Pressable>
        <Text>Wprowadź nazwę użytkownika:</Text>
        <Controller
          control={methods.control}
          render={({ field }) => (
            <>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  // console.log(text);
                  field.onChange(text)
                }}
                value={field.value}
                placeholder="Nazwa użytkownika"
              />
            </>
          )}
          name="username"
          rules={username_validation.validation}
        />

        <Text>Wprowadź hasło:</Text>
        <Controller
          control={methods.control}
          render={({ field }) => (
            <>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  // console.log(text);
                  field.onChange(text)
                }}
                value={field.value}
                placeholder="Hasło"
                secureTextEntry={true}
              />
            </>
          )}
          name="password"
          rules={password_validation.validation}
        />

        <Pressable style={styles.button} onPress={methods.handleSubmit(handleLogin)}>
          <Text style={styles.buttonText}>Zaloguj</Text>
        </Pressable>
        <Pressable style={styles.buttonRegister} onPress={handleRegister}>
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </Pressable>
      </View>
    </FormProvider>
  );
};
//   return (
//   <View style={styles.container}>
//     <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
//     <Text>Wprowadź nazwę użytkownika:</Text>
//     <TextInput
//       style={styles.input}
//       onChangeText={(text) => {
//           setUsername(text);
//           validateField(text, username_validation.validation, setUsernameError);
//         }}
//       value={username}
//       placeholder="Nazwa użytkownika"
//     />
//     {usernameError !== '' && <Text>{usernameError}</Text>}

//     <Text>Wprowadź hasło:</Text>
//     <TextInput
//       style={styles.input}
//       onChangeText={(text) => {
//           setPassword(text);
//           validateField(text, password_validation.validation, setPasswordError);
//         }}
//       value={password}
//       placeholder="Hasło"
//     />
//     <Pressable style={styles.button} onPress={handleLogin}>
//       <Text style={styles.buttonText}>Zaloguj</Text>
//     </Pressable>
//     <Pressable style={styles.buttonRegister} onPress={handleRegister}>
//       <Text style={styles.buttonText}>Zarejestruj się</Text>
//     </Pressable>
//   </View>
//   );
// };
export default LoginScreen;

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
