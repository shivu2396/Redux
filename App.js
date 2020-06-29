import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import SignInScreen from './app/screens/sigin-screen/';
import { HomeScreen } from './app/screens/Info-screen';
import { SplashScreen } from './app/screens/splash-screen';
import { AuthContext } from './app/component/context';
// const AuthContext = React.createContext();

// const Stack = createStackNavigator();

// const App = () => {
//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     }
//   );

//   React.useEffect(() => {
//     // Fetch the token from storage then navigate to our appropriate place
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         // Restoring token failed
//       }

//       // After restoring token, we may need to validate it in production apps

//       // This will switch to the App screen or Auth screen and this loading
//       // screen will be unmounted and thrown away.
//       dispatch({ type: 'RESTORE_TOKEN', token: userToken });
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async (data) => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token
//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//         console.log('data', token);
//       },
//       signOut: () => dispatch({ type: 'SIGN_OUT' }),
//       signUp: async (data) => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//       },
//     }),
//     []
//   );

//   return (
//     <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         <Stack.Navigator headerMode="none">
//           {state.isLoading ? (
//             // We haven't finished checking for the token yet
//             <Stack.Screen name="Splash" component={SplashScreen} />
//           ) : state.userToken == null ? (
//             // No token found, user isn't signed in
//             <Stack.Screen name="SignIn" component={SignInScreen} />
//           ) : (
//             // User is signed in
//             <Stack.Screen name="Home" component={HomeScreen} />
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// };
// export default App;

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
        if (userName == 'User' && password == 'Pass') {
          try {
            userToken = 'Prinkal';
            // const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log('catch login', e);
          }
        } else {
          console.log('not called');
        }
        console.log('user Token', userToken);
        dispatch({ type: 'SIGN_IN', id: userName, token: userToken });
      },
      logOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          // const jsonValue = JSON.stringify(value)
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log('catch lo out', e);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        // const jsonValue = JSON.stringify(value)
      } catch (e) {
        console.log('catch effect', e);
      }
      console.log('user Token effect', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
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
