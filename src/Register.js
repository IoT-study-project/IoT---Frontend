import React from 'react';
import axios from 'axios';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { password_validation, username_validation} from './inputValidation';
import { url } from '../config';

const RegisterScreen = ({ navigation }) => {
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const verifyData = async (data) => {
    await axios.post(url + "register", data)
    .then(async response => {
      navigation.navigate('Login');
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 409) {
          alert('User exists!');
        }else{
          alert('Error:', error.response.status);
        }
      } else if (error.request) {
        alert('No response received');
      } else {
        alert('Request setup error:', error.message);
      }
    });
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
