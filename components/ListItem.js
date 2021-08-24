import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from "../utils/variables";

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.block}>
      <Image style={styles.image} source={{uri: uploadsUrl + singleMedia.filename}} />
      <View style={{flex: 1, paddingRight: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {singleMedia.title}
        </Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    margin: 20,
  },
});

export default ListItem;
