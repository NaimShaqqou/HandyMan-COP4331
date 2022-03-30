import { Center } from 'native-base'
import React from 'react'

import ProfileComponent from '../components/ProfileComponent'

const Profile = () => {

  return (
    <Center display={'flex'} flex={1} backgroundColor='#fff'>
      <ProfileComponent />  
    </Center>
  )
}

export default Profile