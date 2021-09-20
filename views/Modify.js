import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Alert, View} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Modify = ({route}) => {
  const navigation = route.params.navigation;
  const {inputs, handleInputChange, refresh, uploadErrors, setInputs} = useUploadForm();
  const {modifyMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  useEffect(() => {
    (()=>{
      setInputs({title:route.params.singleMedia.title, description: route.params.singleMedia.description});
    })();
  }, []);

  const doModify = async () => {

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await modifyMedia(inputs, userToken, route.params.singleMedia.file_id);
      if (result.message) {
        Alert.alert(
          'Modify',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                doRefresh();
                navigation.navigate('My Files');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      Alert.alert('error');
      console.log('modify', e.message);
    }
  };

  const doRefresh = () => {
    refresh();
  };

  return (
    <View>
      <UploadForm
        title="Modify"
        handleSubmit={doModify}
        handleInputChange={handleInputChange}
        loading={loading}
        uploadErrors={uploadErrors}
        inputs={inputs}
      />
      <Button title={'Refresh'} onPress={doRefresh} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

Modify.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Modify;
