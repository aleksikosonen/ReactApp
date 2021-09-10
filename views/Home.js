import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Icon from 'react-native-feather';
import List from '../components/List';

const image = {uri: 'https://i.ytimg.com/vi/H-WEhug-up8/maxresdefault.jpg'};

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topContainer}>
        <ImageBackground
          source={image}
          resizeMode={'cover'}
          style={styles.image}
          imageStyle={styles.imgStyle}
        />
        <View style={styles.text}>
          <Text style={styles.font}>Kodittomat kissat</Text>
        </View>
        <Icon.Settings style={styles.icon} />
      </View>
      <View style={styles.bottomContainer}>
        <List navigation={navigation} style={styles.bottomContainer} />
      </View>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bottomContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  topContainer: {
    flex: 2,
  },
  image: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    height: 50,
    width: 250,
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  font: {
    color: '#3D405B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgStyle: {
    flex: 1,
    borderBottomRightRadius: 50,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Home;
