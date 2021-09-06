import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {navigation.navigate('Single', singleMedia)}}
      style={styles.block}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />
      <View style={{flex: 3, paddingRight: 10}}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={{color: '#F4F1DE'}}>{singleMedia.description}</Text>
      </View>
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
});

export default ListItem;
