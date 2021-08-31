import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, View} from 'react-native';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        })
      );
      console.log('token login', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      console.log(await AsyncStorage.getItem('userToken'));
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('doLogin error', e.message);
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
      <Button title="Login!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
