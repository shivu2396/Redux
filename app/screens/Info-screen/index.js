import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../component/context';

export const HomeScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text style={{ marginVertical: 50 }}>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};
