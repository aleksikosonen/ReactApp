import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {ListItem as NEListItem, Avatar, View} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <NEListItem bottomDivider containerStyle={{backgroundColor: '#3D405B'}}>
        <Avatar
          source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
          size={'large'}
          rounded
        />
        <NEListItem.Content>
          <NEListItem.Title style={{color: 'white'}}>
            {singleMedia.title}
          </NEListItem.Title>
          <NEListItem.Subtitle style={{color: 'white'}}>
            {singleMedia.description}
          </NEListItem.Subtitle>
        </NEListItem.Content>
        <NEListItem.Chevron />
      </NEListItem>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#3D405B',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 3,
    height: 100,
    width: 100,
    borderBottomLeftRadius: 30,
    maxHeight: 200,
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  container: {},
});

export default ListItem;
