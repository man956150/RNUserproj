import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;