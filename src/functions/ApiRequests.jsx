import axios from "axios";
import {Buffer} from "buffer";
import {unsplash_access_key, unsplashRandomImageUrl} from "../Constants";

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

export const getImageUrl = async () => {
  const response = await axios.get(unsplashRandomImageUrl, {
    headers: {
      Authorization: `Client-ID ${unsplash_access_key}`
    }
  });
  return response.data.urls.small_s3;
}
export const getBase64 = async () => {
    return await getImageUrl().then((response) => {
        return axios
            .get(response, {
                responseType: "arraybuffer",
                headers: {
                    "Content-Type": "image/jpeg",
                    Authorization: "",
                },
            })
            .then((response) => {
                return Buffer.from(response.data, "binary").toString("base64");
            });
    });
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

export const getWithBody=(url,body)=>{
  return axios.get(url,body)
}