import { Box, Center, Image, Heading, Text } from 'native-base'
import React from 'react'

import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.user)

  return (
    <Box>
      <Center safeAreaTop>
        <Image 
          source={require('../../assets/user-profile.jpg')} 
          h="150px" w="150px" borderRadius="40"
        />
        <Heading mt={'15px'}>
          {user.firstName + " " + user.lastName}
        </Heading>
      </Center>

      <Center mt={'25px'}>
        <Heading>
          About Me:
        </Heading>

        <Text>
          {user.profileDescription}
        </Text>
      </Center>
    </Box>
  )
}

export default Profile