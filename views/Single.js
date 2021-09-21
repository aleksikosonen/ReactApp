import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Text, Image, Button} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Audio, Video} from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../hooks/ApiHooks";

const Single = ({route}) => {
  const {filename, title, description, time_added, media_type, screenshot, user_id} = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [posterUsername, setPosterUsername] = useState({username:''});
  const {getUserInfo} = useUser()

  const getPosterUsername = async (id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const username = await getUserInfo(id, userToken);
    console.log('getPosterusername', username)
    setPosterUsername(username);
  }

  useEffect(() => {
    (async ()=>{
      await getPosterUsername(user_id)
    })();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {media_type === 'image' && (
          <Image source={{uri: uploadsUrl + filename}} style={styles.image} />
        )}

        {media_type === 'video' && (
          <>
            <Video
              ref={videoRef}
              source={{uri: uploadsUrl + filename}}
              style={styles.image}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              usePoster
              posterSource={{uri: uploadsUrl + screenshot}}
            />
            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                  status.isPlaying
                    ? videoRef.current.pauseAsync()
                    : videoRef.current.playAsync()
                }
              />
            </View>
          </>
        )}
        {media_type === 'audio' && (
          <>
            <Text>Audio not supported</Text>
            <Audio />
          </>
        )}
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>
          {format(new Date(time_added), 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.text}>{posterUsername.username}</Text>
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
