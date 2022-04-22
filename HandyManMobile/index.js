// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);

import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import { store } from "./src/reducerStore/store.js";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1876d2",
    accent: "#f1c40f",
  },
};

const NewRootComponent = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
};

export default registerRootComponent(NewRootComponent);
