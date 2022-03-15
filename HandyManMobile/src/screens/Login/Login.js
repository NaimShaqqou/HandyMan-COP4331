import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLoginPressed = () => {
    // Authentication

    navigation.navigate('Home');
  }

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password Pressed");

    // TODO: create forgot password page
    // navigate to that page from here
  }

  const onRegisterTransition = () => {
    navigation.navigate('Register');
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.root}>
        <Text style={styles.heading}>Login</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <CustomInput 
          placeholder="Password" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry 
        />


        <CustomButton 
          text="Login" 
          onPress={onLoginPressed}
          type="PRIMARY"
        />

        <CustomButton 
          text="Forgot Password?" 
          onPress={onForgotPasswordPressed} 
          type="TERTIARY"
        />


        <CustomButton 
          text="Don't have an account? Click here!"
          onPress={onRegisterTransition}
          type="TERTIARY"
        />

        <PrivacyPolicy text="logging in" />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
  },
  register: {

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  },
});

export default Login