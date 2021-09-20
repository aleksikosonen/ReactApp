import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {
  Text,
  Image,
  Avatar,
  ListItem,
  Card,
  Input,
} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTags, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import useEditForm from '../hooks/EditHooks';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400/');
  const [email, setEmail] = useState(user.email);
  const [updateProfile, setUpdateProfile] = useState(false);
  const {getFilesByTag} = useTags();
  const {handleInputChange, inputs} = useEditForm();
  const {updateUserEmail} = useUser();

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const editEmail = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    updateUserEmail(inputs, userToken);
    setEmail(inputs.email);
    setUpdateProfile(false);
  };

  useEffect(() => {
    (async () => {
      const userAvatar = await getFilesByTag(user.user_id);
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
        {updateProfile ? (
          <Input
            autoCapitalize="none"
            placeholder="New email"
            onChangeText={(txt) => handleInputChange('email', txt)}
          />
        ) : (
          <ListItem>
            <Avatar icon={{name: 'email', color: 'black'}} />
            <Text>{email}</Text>
          </ListItem>
        )}
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('My Files');
          }}
        >
          <Avatar icon={{name: 'logout', color: 'black'}} />
          <ListItem.Content>
            <ListItem.Title>My Files</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress={logout}>
          <Avatar icon={{name: 'logout', color: 'black'}} />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        {updateProfile ? (
          <Button title={'Save changes'} onPress={editEmail} />
        ) : (
          <></>
        )}
        {updateProfile ? (
          <Button
            title={'Cancel'}
            onPress={() => setUpdateProfile(!updateProfile)}
          />
        ) : (
          <Button
            title={'Edit'}
            onPress={() => setUpdateProfile(!updateProfile)}
          />
        )}
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

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
