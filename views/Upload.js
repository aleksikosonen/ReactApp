import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Alert, Platform, View} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTags} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appId} from '../utils/variables';

const Upload = ({navigation}) => {
  const {inputs, handleInputChange, refresh, uploadErrors} = useUploadForm();
  const {type, setType} = useState('');
  const {uploadMedia, loading} = useMedia();
  const {addTag} = useTags();

  const doUpload = async () => {
    console.log('Upload title', inputs);
    const filename = image.uri.split('/').pop();
    const formData = new FormData();
    formData.append('file', {uri: image.uri, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await uploadMedia(formData, userToken);
      const tagResult = await addTag(result.file_id, appId, userToken);
      if (tagResult.message) {
        Alert.alert(
          'Upload',
          'File uploaded',
          [
            {
              text: 'Ok',
              onPress: () => {
                doRefresh();
                navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('doupload', e.message);
    }
  };

  const [image, setImage] = useState(require('../assets/adaptive-icon.png'));

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({uri: result.uri});
      setType(result.type);
    }
  };

  const doRefresh = () => {
    console.log('Upload js doReset');
    setImage(null);
    refresh();
  };

  return (
    <View>
      <Image source={image} style={{width: '100%', height: 200}} />
      <Button title="Select media" onPress={pickImage} />
      <UploadForm
        title="Upload"
        handleSubmit={doUpload}
        handleInputChange={handleInputChange}
        loading={loading}
        uploadErrors={uploadErrors}
        source={image}
      />
      <Button title={'Refresh'} onPress={doRefresh} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upload;
