import axios from 'axios';

export const url = `https://i1j2f32umi.execute-api.eu-north-1.amazonaws.com/default/`;

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}