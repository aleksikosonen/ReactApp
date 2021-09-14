import {baseUrl} from '../utils/variables';
import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import axios from 'axios';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbnailia = await doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return await Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia: ', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia: ', e.message);
      return {};
    }
  };

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        data: formData,
      };
      const result = await axios(baseUrl + 'media/', requestOptions);
      if (result) {
        setUpdate(update + 1);
      }
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia, uploadMedia, loading};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: userCredentials,
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('uselogin error ', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const requestOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const userInfo = doFetch(baseUrl + 'users/user', requestOptions);
      return userInfo;
    } catch (e) {
      console.log('checkToken error: ', e.message);
    }
  };

  const register = async (userCredentials) => {
    const registerInputs = {
      username: userCredentials.username,
      password: userCredentials.password,
      email: userCredentials.email,
      full_name: userCredentials.full_name,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      return response;
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return false;
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const userName = await doFetch(baseUrl + 'users/username/' + username);
      console.log(userName.available);
      return userName.available;
    } catch (e) {
      console.log('checkUsername error: ', e.message);
    }
  };

  const updateUserEmail = async (email, token) => {
    console.log(email);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      return await response.json();
    } catch (e) {
      console.log('ApiHooks updateEmail', e.message);
      return false;
    }
  };

  return {checkToken, register, checkUsernameAvailable, updateUserEmail};
};

const useTags = () => {
  const getFilesByTag = async (tag) => {
    try {
      const avatar = await doFetch(baseUrl + 'tags/avatar_' + tag);
      return avatar;
    } catch (e) {
      console.log('getFilesByTag: ', e.message);
      return {};
    }
  };
  return {getFilesByTag};
};

export {useMedia, useLogin, useUser, useTags};
