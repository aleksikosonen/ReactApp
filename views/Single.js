import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import {uploadsUrl} from "../utils/variables";

const Single = ({ route }) => {
  const { filename, title, description } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={{uri: uploadsUrl + filename}} style={styles.image}/>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Single.propTypes = {};

export default Single;
