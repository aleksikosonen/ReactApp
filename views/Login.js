import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {login} = useLogin();
  const {checkToken} = useUser();
  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: 'alekskos',
          password: '',
        })
      );
      console.log('token login', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      console.log(await AsyncStorage.getItem('userToken'));
      // TODO: Save user info (logininfo.user) to maincontext
      setIsLoggedIn(true);
    } catch (e) {
      console.log('doLogin error', e.message);
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);

    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        // TODO: save user info to maincontext
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text h3={true} style={styles.text}>
            Login
          </Text>
          <LoginForm navigation={navigation} />
          <Text h3={true} style={styles.text}>
            Register
          </Text>
          <RegisterForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  text: {
    padding: 16,
    alignSelf: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
