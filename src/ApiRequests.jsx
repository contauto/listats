import axios from "axios";

export const getData = (url) => {
  return axios.get(url);
};

export const postData=(url,body)=>{
  return axios.post(url, body);
}

export const auth = (client_id, client_secret, url, body) => {
  const authorizationHeaderValue =
  "Basic " + btoa(client_id + ":" + client_secret);
  axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
  axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  return postData(url,body)
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
