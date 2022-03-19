import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// native-base
import { Button, Box, Center, Input, Icon, Heading, FormControl, Link } from 'native-base'
import { MaterialIcons } from "@native-base/icons"

// components
import LoginBox from "../../components/LoginBox"


const Login = () => {
  return (
    <Center w="100%" flex={1} >
      <LoginBox />
    </Center>
  )
}

export default Login