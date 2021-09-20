import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  ListItem as NEListItem,
  Avatar,
  View,
  Button,
} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation, enableEdit}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

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
          {enableEdit && (
            <>
              <Button
                title={'Edit'}
                onPress={() => {
                  navigation.navigate('Modify', {singleMedia, navigation});
                }}
              />
              <Button
                title={'Delete'}
                onPress={async () => {
                  try {
                    const userToken = await AsyncStorage.getItem('userToken');
                    const response = await deleteMedia(
                      singleMedia.file_id,
                      userToken
                    );
                    console.log('Delete', response);
                    if (response.message) {
                      setUpdate(update + 1);
                    }
                  } catch (e) {
                    console.log('Listitem delete failed', e.message);
                  }
                }}
              />
            </>
          )}
        </NEListItem.Content>
        <NEListItem.Chevron />
      </NEListItem>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
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
