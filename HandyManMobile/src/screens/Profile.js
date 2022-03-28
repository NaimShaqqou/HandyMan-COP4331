import { Box, Center, Image, Heading, Text } from 'native-base'
import React from 'react'

const Profile = () => {
  return (
    <Box>
      <Center safeAreaTop>
        <Image 
          source={require('../../assets/user-profile.jpg')} 
          h="150px" w="150px" borderRadius="40"
        />
        <Heading mt={'15px'}>
          John Doe
        </Heading>
      </Center>

      <Center mt={'25px'}>
        <Heading>
          About Me:
        </Heading>

        <Text>
          This is the description.
        </Text>
      </Center>
    </Box>
  )
}

export default Profile