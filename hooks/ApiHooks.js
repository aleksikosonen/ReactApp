import {baseUrl} from '../utils/variables';
import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

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
  return {mediaArray, loadSingleMedia};
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

  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputs,
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      return await response.json();
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return false;
    }
  };

  return {checkToken, register};
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
  }
  return {getFilesByTag}
};

export {useMedia, useLogin, useUser, useTags};
