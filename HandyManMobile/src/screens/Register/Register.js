import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {passwordRepeat, setPasswordRepeat} = useState('');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    // TODO: email confirmation
    
    navigation.navigate('Home');
  }

  const onLoginTransition = () => {
    navigation.navigate('Login');
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.root}>
        {/* <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        /> */}

        <Text style={styles.heading}>Register</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        
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

        <CustomInput 
          placeholder="Confirm Password" 
          value={passwordRepeat} 
          setValue={setPasswordRepeat} 
          secureTextEntry 
        />


        <CustomButton 
          text="Register" 
          onPress={onRegisterPressed}
          type="PRIMARY"
        />

        <PrivacyPolicy text="registering" />

        <CustomButton 
          text="Already have an account? Click here!"
          onPress={onLoginTransition}
          type="TERTIARY"
        />

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

export default Register