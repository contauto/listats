import axios from "axios";
import { Buffer } from "buffer";

export const getData = (url) => {
  return axios.get(url);
};

export const postData = (url, body) => {
  return axios.post(url, body);
};

export const putData = (url, body) => {
  axios.defaults.headers["Content-Type"] = "image/jpeg";
  return axios.put(url, body);
};

export const getBase64 = async () => {
  var axios = require("axios");
  let image = await axios.get("https://random.imagecdn.app/320/320", {
    responseType: "arraybuffer",
  });
  let raw = Buffer.from(image.data).toString("base64");
  return raw;
};

export const auth = (client_id, client_secret, url, body) => {
  const authorizationHeaderValue =
    "Basic " + btoa(client_id + ":" + client_secret);
  axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
  axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  return postData(url, body);
};

export const setAuthorizationHeader = ({ isLoggedIn, access_token }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Bearer ${access_token}`;
    axios.defaults.headers["Content-Type"] = "application/json";
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
