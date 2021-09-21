import {appId, baseUrl} from '../utils/variables';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../utils/http';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useMedia = (ownFiles = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      let mediaIlmanThumbnailia = await doFetch(baseUrl + 'tags/' + appId);
      if (ownFiles) {
        mediaIlmanThumbnailia = mediaIlmanThumbnailia.filter(
          (item) => item.user_id === user.user_id
        );
      }
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('apihooks loadMedia: ', e.message);
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
        body: formData,
      };
      const result = await doFetch(baseUrl + 'media/', requestOptions);
      return result;
    } catch (e) {
      console.log('uploadMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyMedia = async (data, token, id) => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await doFetch(baseUrl + 'media/' + id, requestOptions);
      return result;
    } catch (e) {
      console.log('modifymedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, userToken) => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'x-access-token': userToken,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, requestOptions);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia, uploadMedia, loading, deleteMedia, modifyMedia};
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

  const getUserInfo = async (id, token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const userName = await doFetch(baseUrl + 'users/' + id, fetchOptions);
      return userName;
    } catch (e) {
      console.log('getUsername error: ', e.message);
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

  return {checkToken, register, checkUsernameAvailable, updateUserEmail, getUserInfo};
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

  const addTag = async (file_id, tag, token) => {
    console.log(file_id, tag);
    const requestOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id, tag}),
    };
    try {
      const tagInfo = await doFetch(baseUrl + 'tags', requestOptions);
      return tagInfo;
    } catch (e) {
      console.log('addTag error: ', e.message);
      throw new Error(e.message);
    }
  };
  return {getFilesByTag, addTag};
};

export {useMedia, useLogin, useUser, useTags};
