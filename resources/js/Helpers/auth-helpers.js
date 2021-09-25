import axios from 'axios';

// axios.defaults.baseURL = "http://localhost/www/backend/php/login-jwt/public/api/v1";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const TOKEN_KEY = "BLOGGERDEV_TOKEN"

export function setToken(token){
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(){
  return localStorage.getItem(TOKEN_KEY); 
}

export function deleteToken(){
  localStorage.removeItem(TOKEN_KEY);
}

export function initAxiosInterceptors(){
  axios.interceptors.request.use(function (config){
    const token = getToken();

    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    function(response){
      return response;
    },
    function(error){
      if(error.response.status === 401){
        return Promise.reject(error);
      }else if(error.response.status === 422){
        return Promise.reject(error);
      }
    }
  );
}