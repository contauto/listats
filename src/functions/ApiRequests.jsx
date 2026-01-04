import axios from 'axios';
import { Buffer } from 'buffer';
import { unsplash_access_key, unsplashRandomImageUrl } from '../Constants';

export const getData = (url) => axios.get(url);

export const postData = (url, body) => axios.post(url, body);

export const putData = (url, body) => {
  axios.defaults.headers['Content-Type'] = 'image/jpeg';
  return axios.put(url, body);
};

export const getImageUrl = async () => {
  const response = await axios.get(unsplashRandomImageUrl, {
    headers: { Authorization: `Client-ID ${unsplash_access_key}` }
  });
  return response.data.urls.small_s3;
};

export const getBase64 = async () => {
  const imageUrl = await getImageUrl();
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
    headers: { 'Content-Type': 'image/jpeg', Authorization: '' }
  });
  return Buffer.from(response.data, 'binary').toString('base64');
};

export const auth = (clientId, clientSecret, url, body) => {
  const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers['Authorization'] = authHeader;
  return postData(url, body);
};

export const setAuthorizationHeader = ({ isLoggedIn, access_token }) => {
  if (isLoggedIn) {
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};