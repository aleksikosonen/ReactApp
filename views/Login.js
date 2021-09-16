import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);
  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: 'alekskos',
          password: '',
        })
      );
      await AsyncStorage.setItem('userToken', loginInfo.token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('doLogin error', e.message);
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.log('getToken', e.message);
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
          {registerFormToggle ? (
            <Card>
              <Card.Divider />
              <Card.Title h4>Register</Card.Title>
              <RegisterForm navigation={navigation} />
              <Button
                title={'Already a user? Login!'}
                onPress={() => setRegisterFormToggle(!registerFormToggle)}
              />
            </Card>
          ) : (
            <Card>
              <Card.Title h4>Login</Card.Title>
              <LoginForm navigation={navigation} />
              <Button
                title={'New user? Register here!'}
                onPress={() => setRegisterFormToggle(!registerFormToggle)}
              />
            </Card>
          )}
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
