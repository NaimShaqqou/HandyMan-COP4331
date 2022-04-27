import React from 'react'

import EditProfileComponent from '../components/EditProfileComponent'
import { Center } from 'native-base'

const EditProfile = () => {
  return (
    <Center display={'flex'} flex={1} backgroundColor="#003b801a">
      <EditProfileComponent />
    </Center>
  )
}

export default EditProfile