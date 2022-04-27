import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Center, Text } from "native-base";
import { ActivityIndicator, Colors } from "react-native-paper";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";

// Redux
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "./src/reducerStore/ActionCreators/index";

import axios from "axios";

export default function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateCurrentUser, loginServices } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // try to see if user is already logged in
  useEffect(() => {
    setTimeout(
      async () => {
      let userInfo = null;
      let serviceInfo = null;
      try {
        userInfo = await AsyncStorage.getItem("userInfo");
        serviceInfo = await AsyncStorage.getItem("serviceInfo");
      } catch (e) {
        console.log(e);
      }

      if (userInfo == null) {
        userInfo = {
          userId: "",
          firstName: "",
          lastName: "",
          profileDescription: "",
          profilePicture: "",
          userName: "",
          jwtToken: "",
        };
      } else {
        userInfo = JSON.parse(userInfo);
        // checks if the user's token is expired or not
        await axios
          .post("https://myhandyman1.herokuapp.com/api/refresh-token", {
            jwtToken: userInfo.jwtToken,
          })
          .then((response) => {
            console.log("checking jwtToken")
            if (response.data.refreshedToken === "") {
              console.log("jwtToken invalid")
              userInfo = { ...userInfo, jwtToken: "" };
            }
          })
          .catch((response) => {
            console.log(response);
          });
      }

      serviceInfo = JSON.parse(serviceInfo);

      console.log(userInfo.jwtToken)

      updateCurrentUser(userInfo);
      loginServices(serviceInfo);
    }, 1000);
  }, []);

  if (user.isLoading) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <ActivityIndicator size="large" />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    // <Provider store={store}>
    // <AppContext.Provider value={{authContext, userState}}>
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        {user.jwtToken != "" ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>

    // </AppContext.Provider>
    // </Provider>
  );
}

// const initialUserState = {
//   isLoading: true,
//   userId: "",
//   firstName: "",
//   lastName: "",
//   profileDescription: "",
//   profilePicture: "",
//   userName: "",
//   jwtToken: "",
// };

// const userReducer = (prevState, action) => {
//   switch( action.type ) {
//     case 'RETRIEVE_TOKEN':
//       return {
//         ...prevState,
//         userId: action.payload.userId,
//         firstName: action.payload.firstName,
//         lastName: action.payload.lastName,
//         profileDescription: action.payload.profileDescription,
//         profilePicture: action.payload.profilePicture,
//         jwtToken: action.payload.jwtToken,
//         isLoading: false,
//       };
//     case 'LOGIN':
//       return {
//         ...prevState,
//         userId: action.payload.userId,
//         firstName: action.payload.firstName,
//         lastName: action.payload.lastName,
//         profileDescription: action.payload.profileDescription,
//         profilePicture: action.payload.profilePicture,
//         jwtToken: action.payload.jwtToken,
//         isLoading: false,
//       };
//     case 'LOGOUT':
//       return {
//         ...prevState,
//         userId: "",
//         firstName: "",
//         lastName: "",
//         profileDescription: "",
//         profilePicture: "",
//         userName: "",
//         jwtToken: "",
//         isLoading: false,
//       };
//     case 'REGISTER':
//       return {
//         ...prevState,
//         //userName: action.id,
//         // jwtToken: action.token,
//         isLoading: false,
//       };
//   }
// };

// const [userState, dispatch] = React.useReducer(userReducer, initialUserState);

// const authContext = React.useMemo(() => ({
//   Login: async (userInfo) => {
//     console.log(userInfo)
//     try {
//       await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
//     } catch(e) {
//       console.log(e)
//     }

//     console.log(userInfo)
//     dispatch({ type: 'LOGIN', payload: userInfo})
//   },
//   Logout: async() => {
//     try {
//       await AsyncStorage.removeItem('userInfo')
//     } catch(e) {
//       console.log(e)
//     }
//     dispatch({ type: 'LOGOUT' })
//   },
//   Register: () => {
//     setIsLoading(false);
//   },
// }), []);
