import { Image, Center } from 'native-base'
import React from 'react'

const Logo = ( { size } ) => {
  return (
    <Center>
        <Image 
            source={ require('../../assets/Logo.png') }
            alt="Handyman Logo" 
            resizeMode={"contain"}
            size={ size }
            // borderRadius={150}
        />
    </Center>
  )
}

export default Logo