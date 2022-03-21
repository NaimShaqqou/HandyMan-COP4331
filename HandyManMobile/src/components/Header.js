import { 
    Box,
    HStack,
    IconButton,
    Icon,
    Text
} from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import React from 'react'

const Header = ({title}) => {
  return (
    <>
        {/* <Box bg="primary.500" h='200' /> */}
        <HStack bg="primary.500" justifyContent="space-between" alignItems="center" w="100%" h='16' >
            <HStack alignItems="center">
                <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
                <Text color="white" fontSize="20" fontWeight="bold">
                    {title}
                </Text>
            </HStack>
            <HStack>
                <IconButton icon={<Icon as={MaterialIcons} name="chat" size="sm" color="white" />} />
                <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
                <IconButton icon={<Icon as={MaterialIcons} name="map" size="sm" color="white" />} />
            </HStack>
        </HStack>
    </>

  )
}

export default Header