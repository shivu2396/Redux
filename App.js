import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import SignInScreen from './app/screens/sigin-screen/';
import { HomeScreen } from './app/screens/Info-screen';
import { SplashScreen } from './app/screens/splash-screen';
import { AuthContext } from './app/component/context';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RETRIEVE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userName: null,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken;
        userToken = null;
        if (userName == 'Shivani' && password == '123') {
          try {
            userToken = ' ';

            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {}
        } else {
        }
        console.log('user Token', userToken);
        dispatch({ type: 'SIGN_IN', id: userName, token: userToken });
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log('catch', e);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('catch effect', e);
      }
      console.log('user Token effect', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
