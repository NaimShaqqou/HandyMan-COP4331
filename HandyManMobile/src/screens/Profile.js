import { Center } from 'native-base'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileComponent from '../components/ProfileComponent'
import EditProfileComponent from '../components/EditProfileComponent'

const Stack = createNativeStackNavigator();


const Profile = () => {
  return (
    <Center display={'flex'} flex={1} backgroundColor='#fff'>
      <ProfileComponent /> 
    </Center>
  )
}

export default Profile