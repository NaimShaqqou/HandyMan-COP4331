import React from 'react';
import { NativeBaseProvider, Text, Box } from 'native-base';

const TestPage = () =>
{
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#aff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default TestPage;