import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as signup from './components/signup';
import * as login from './components/Login1';
import * as home from './components/home';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="signUp"
          component={signup.default}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Login" component={login.default} />
        <Stack.Screen name="home" component={home.default} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
