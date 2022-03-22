import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import Navigation from './src/navigation/navigation.js';

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
