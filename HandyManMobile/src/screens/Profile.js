import AppContext from '../components/AppContext'
import { Box, Center, Image, Heading, Text } from 'native-base'
import React from 'react'

const Profile = () => {
  const { userState } = React.useContext(AppContext)


  return (
    <Box>
      <Center safeAreaTop>
        <Image 
          source={require('../../assets/user-profile.jpg')} 
          h="150px" w="150px" borderRadius="40"
        />
        <Heading mt={'15px'}>
          {userState.firstName + " " + userState.lastName}
        </Heading>
      </Center>

      <Center mt={'25px'}>
        <Heading>
          About Me:
        </Heading>

        <Text>
          {userState.profileDescription}
        </Text>
      </Center>
    </Box>
  )
}

export default Profile