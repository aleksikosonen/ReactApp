import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import {Button, Input} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {View} from 'react-native';

const UploadForm = ({title, handleSubmit, handleInputChange}) => {
  const {inputs, handleInputUpload, loading} = useUploadForm();
  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
      />
      <Button title={title} onPress={handleSubmit} loading={loading} />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UploadForm;
