import { View, Text } from 'react-native'
import React from 'react'

import EditProfileComponent from '../components/EditProfileComponent'
import { Center, Box } from 'native-base'
import { Button } from 'react-native-paper'

const EditProfile = () => {
  return (
    <Center display={'flex'} flex={1} backgroundColor='#fff'>
      <EditProfileComponent />
    </Center>
  )
}

export default EditProfile