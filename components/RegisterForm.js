import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';
import {validator} from '../utils/validator';

const RegisterForm = ({navigation}) => {
  const {inputs, errors, handleInputChange, checkUsername, handleOnEndEditing} = useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
      console.log('doRegister', serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };
  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          checkUsername(event.nativeEvent.text);
          handleOnEndEditing('username', event.nativeEvent.text);
        }}
        errorMessage={errors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('password', event.nativeEvent.text);
        }}
        errorMessage={errors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('confirmPassword', event.nativeEvent.text);
        }}
        errorMessage={errors.confirmPassword}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('email', event.nativeEvent.text);
        }}
        errorMessage={errors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('full_name', event.nativeEvent.text);
        }}
        errorMessage={errors.full_name}
      />
      <Button
        title="Register!"
        onPress={doRegister}
        disabled={
          errors.username || errors.password || errors.email || errors.full_name
        }
      />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
