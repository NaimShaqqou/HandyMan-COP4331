import { Center } from 'native-base'
import React from 'react'

import ProfileComponent from '../components/ProfileComponent'
import EditProfileComponent from '../components/EditProfileComponent'


const Profile = ({edit}) => {
  return (
    <Center display={'flex'} flex={1} backgroundColor='#fff'>
      {edit ? <EditProfileComponent /> : <ProfileComponent /> }
    </Center>
  )
}

export default Profile