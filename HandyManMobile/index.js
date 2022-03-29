// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);

import React from 'react'
import { registerRootComponent } from 'expo';
import App from './App';
import { store } from './src/reducerStore/store.js'
import { Provider } from 'react-redux'
 
const NewRootComponent = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
}
 
export default registerRootComponent(NewRootComponent);