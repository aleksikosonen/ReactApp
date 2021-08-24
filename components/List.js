import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListItem from './ListItem';
import {baseUrl} from "../utils/variables";

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);
  const url = baseUrl;

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMediaArray(json);
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
