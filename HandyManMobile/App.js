import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Center, View } from 'native-base';

import Navigation from './src/navigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
