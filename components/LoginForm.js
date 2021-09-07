import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
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
      const loginInfo = await login(JSON.stringify(inputs));
      await AsyncStorage.setItem('userToken', loginInfo.token);
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
      <Button title="Login!" onPress={doLogin} raised={true} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
