import React from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import COLORS from '../context/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}:any) => {
  const [inputs, setInputs] = React.useState<any>({email: '', password: ''});
  const [errors, setErrors] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          (inputs.email == userData.email || inputs.email == userData.mobile ) &&
          inputs.password == userData.password
        ) {
          navigation.navigate('HomeScreen');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
        } else {
          Alert.alert('Error', 'User not found ');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 3000);
  };

  const handleOnchange = (text:any, input:any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error:any, input:any) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Log In
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Email Or Mobile number"
            placeholder="Enter your email or mobile"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have account ? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
