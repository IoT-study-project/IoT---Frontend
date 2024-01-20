import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { password_validation, username_validation, findInputError, isFormInvalid } from './inputValidation';
import { FormProvider, useForm, Controller, set } from 'react-hook-form'
import { url } from '../config';

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
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)

  const handleLogin = async(data) => {
    const errors = methods.formState.errors;
    console.log('Data:', errors, isFormInvalid(errors));
    if (isFormInvalid(errors)) {
      // Handle invalid form
      const usernameError = findInputError(errors, 'username');
      const passwordError = findInputError(errors, 'password');
      console.log('Form is invalid. Username error:', usernameError, 'Password error:', passwordError);
      return;
    }

    console.log('Form is valid. Logging in:', data);
    const JWTtoken = await axios.post(url, { data })
    console.log(JWTtoken);
    console.log(JWTtoken.data);
    console.log('SUCCESS: ', data);
    navigation.navigate('Login');
  };

  const handleRegister = (data) => {
    navigation.navigate('Register');
  };
  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
        <Text>Wprowadź nazwę użytkownika:</Text>
        <Controller
          control={methods.control}
          render={({ field }) => (
            <>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  console.log(text);
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
                  console.log(text);
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
