import React, { useState } from 'react';
import axios from 'axios';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { password_validation, username_validation, findInputError, isFormInvalid } from './inputValidation';
import { url } from '../config';

const RegisterScreen = ({ navigation }) => {
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [mail, setMail] = useState('');

  const verifyData = async (data) => {
    const errors = methods.formState.errors;
    console.log('Data:', errors, isFormInvalid(errors));
    // #TODO: VALIDATE DATA
    if (isFormInvalid(errors)) {
      const usernameError = findInputError(errors, 'username');
      const passwordError = findInputError(errors, 'password');
      console.log('Form is invalid. Username error:', usernameError, 'Password error:', passwordError);
      return;
    }
    console.log('Form is valid. Trying to register with:', data);
    const response = await axios.post(url + "register", data)
    console.log(response);
    console.log(response.data);
    console.log('SUCCESS: ', data);
    navigation.navigate('Login');
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.IoT}>APLIKACJA IoT 💾</Text>
        <Text style={styles.text}>Rejestracja użytkownika</Text>
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
        <Pressable style={styles.buttonRegister} onPress={methods.handleSubmit(verifyData)}>
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </Pressable>
      </View>
    </FormProvider>
  );
};
export default RegisterScreen;

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
