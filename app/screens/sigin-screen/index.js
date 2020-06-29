// import * as React from 'react';
// import React, { useState, Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
// import { AuthContext } from '../../component/context';

// import { styles } from './style';
// export const Signin = (props) => {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const [Token, setToken] = React.useState('');
//   const Onsubmit = async () => {
//     try {
//       setToken({ token: 'abc123' });
//       await AsyncStorage.setItem('token', 'abc123');
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('token');
//       if (value !== null) {
//         setToken({ token: value });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <View style={styles.CONTAINER}>
//       <View style={styles.HEADER}>
//         <Text style={styles.SIGINTXT}>Sigin Screen</Text>
//       </View>
//       <View style={styles.CONTENT}>
//         <TextInput
//           style={styles.box1}
//           placeholder="Name"
//           underlineColorAndroid="transparent"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={styles.box1}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           underlineColorAndroid="transparent"
//         />
//       </View>
//       <View style={styles.FOOTER}>
//         <TouchableOpacity style={styles.btnsignup} onPress={() => Onsubmit}>
//           <Text style={styles.btnsignupText}>Sign In</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './style';

import { AuthContext } from '../../component/context';

const SigninScreen = () => {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');

  const InputName = (userName) => {
    if (userName != null) {
      setName(userName);
    }
  };

  const InputPassword = (password) => {
    if (password != null) {
      setPassword(password);
    }
  };

  const { signIn } = React.useContext(AuthContext);

  const Submit = (userName, password) => {
    signIn(userName, password);
    console.log('info', userName, password);
  };

  return (
    <View style={styles.CONTAINER}>
      <View style={styles.HEADER}>
        <Text style={styles.SIGINTXT}>Sigin Screen</Text>
      </View>
      <View style={styles.CONTENT}>
        <TextInput
          style={styles.box1}
          placeholder="Name"
          underlineColorAndroid="transparent"
          onChangeText={(name) => InputName(name)}
        />
        <TextInput
          style={styles.box1}
          placeholder="Password"
          onChangeText={(password) => InputPassword(password)}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.FOOTER}>
        <TouchableOpacity
          style={styles.btnsignup}
          onPress={() => {
            Submit(userName, password);
          }}
        >
          <Text style={styles.btnsignupText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SigninScreen;
