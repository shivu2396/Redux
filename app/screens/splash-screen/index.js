import * as React from 'react';
import { View, Text } from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text
        style={{
          marginVertical: 50,
        }}
      >
        Loading...
      </Text>
    </View>
  );
};
