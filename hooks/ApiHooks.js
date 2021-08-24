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

export {useMedia};
