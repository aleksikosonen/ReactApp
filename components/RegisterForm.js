import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, View} from 'react-native';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const {inputs, handleInputChange} = useSignUpForm();
  const {register} = useUser();
  const doRegister = async () => {
    const serverResponse = await register(
      JSON.stringify({
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        full_name: inputs.full_name,
      })
    );
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };
  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
