import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Text, Image, Avatar, ListItem, Card} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTags} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400/');

  const {getFilesByTag} = useTags();

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    (async () => {
      const userAvatar = await getFilesByTag(582);
      setAvatar(uploadsUrl + userAvatar[0].filename);
    })();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: 'black'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>
        <ListItem bottomDivider onPress={logout}>
          <Avatar icon={{name: 'logout', color: 'black'}} />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {width: '100%', height: undefined, aspectRatio: 1},
});

Profile.propTypes = {};

export default Profile;
