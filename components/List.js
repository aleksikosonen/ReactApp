import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListItem from './ListItem';
import {baseUrl} from "../utils/variables";

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(baseUrl + 'media');
        const mediaIlmanThumbnailia = await response.json();
        const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
          const response =  await fetch(baseUrl + 'media/' + media.file_id);
          const tiedosto = await response.json();
          return tiedosto;
        });
        setMediaArray(await Promise.all(kaikkiTiedot));
      } catch (e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);

  console.log('media-array', mediaArray);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
