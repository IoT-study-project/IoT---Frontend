import * as SecureStore from 'expo-secure-store';

// export const url = `https://jsonplaceholder.typicode.com/users`;
export const url = `https://o420wgpkd4.execute-api.eu-north-1.amazonaws.com/default/`;

export const AuthHeader = async() => {
    await SecureStore.setItemAsync('secure_token','sahdkfjaskdflas$%^&');
    const token = await SecureStore.getItemAsync('secure_token');
    console.log(token);
    // const token = localStorage.getItem('token');
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}