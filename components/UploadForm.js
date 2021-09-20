import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import Upload from '../views/Upload';

const UploadForm = ({title, handleSubmit, handleInputChange, loading, uploadErrors, image, inputs}) => {
  //const {uploadErrors} = useUploadForm();
  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={uploadErrors.title}
        value={inputs.title}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={uploadErrors.description}
        value={inputs.description}
      />
      <Button
        title={title}
        onPress={handleSubmit}
        loading={loading}
        disabled={
          uploadErrors.title !== null ||
          uploadErrors.description !== null ||
          image === null
        }
      />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
};

export default UploadForm;
