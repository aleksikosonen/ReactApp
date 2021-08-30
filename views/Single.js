import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';

const Single = ({route}) => {
  const {filename, title, description, time_added} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={{uri: uploadsUrl + filename}} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>
          {format(new Date(time_added), 'dd.MM.yyyy')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

Single.propTypes = {};

export default Single;
