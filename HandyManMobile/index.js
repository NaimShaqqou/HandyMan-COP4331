// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);

import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import { store } from "./src/reducerStore/store.js";
import { Provider } from "react-redux";
import { DefaultTheme, configureFonts, Provider as PaperProvider } from "react-native-paper";
import { useFonts } from 'expo-font';

// fixes annoying native base warnings
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['NativeBase:']);

let customFonts = {
  'Comfortaa-regular': require("./assets/Comfortaa/static/Comfortaa-Regular.ttf"),
  'Comfortaa-medium': require("./assets/Comfortaa/static/Comfortaa-Medium.ttf"),
  'Comfortaa-light': require("./assets/Comfortaa/static/Comfortaa-Light.ttf"),
}

const fontConfig = {
  ios: {
    regular: {
      fontFamily: "ComfortaaRegular",
      // fontFamily: customFonts["Comfortaa-regular"],
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "ComfortaaMedium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "ComfortaaLight",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "ComfortaaBold",
      fontWeight: "normal",
    }
    // thin: {
    //   fontFamily: "",
    //   fontWeight: "normal",
    // },
  }
}

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: "#003c80", //#1876d2
    accent: "#f1c40f",
  },
};

const NewRootComponent = () => {
  const [loaded] = useFonts({
    ComfortaaRegular: require("./assets/Comfortaa/static/Comfortaa-Regular.ttf"),
    ComfortaaMedium: require("./assets/Comfortaa/static/Comfortaa-Medium.ttf"),
    ComfortaaLight: require("./assets/Comfortaa/static/Comfortaa-Light.ttf"),
    ComfortaaBold: require("./assets/Comfortaa/static/Comfortaa-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
};

export default registerRootComponent(NewRootComponent);
