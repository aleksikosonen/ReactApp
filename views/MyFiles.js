import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';

const MyFiles = ({navigation}) => {
  const {mediaArray} = useMedia(true);
  return (
    <FlatList
      data={mediaArray.reverse()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          enableEdit={true}
        />
      )}
    />
  );
};

MyFiles.propTypes = {};

export default MyFiles;
