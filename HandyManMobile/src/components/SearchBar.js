import { Input, Icon, Center } from 'native-base'
import { MaterialIcons } from "@native-base/icons"
import { Dimensions } from 'react-native'

import React from 'react'

const SearchBar = () => {
  return (
    <Input 
        placeholder="I need..."
        w="80%"
        h='100%'
        borderRadius="4"
        InputLeftElement={<Icon size="5" ml="2" as={<MaterialIcons name="search" />} Color="muted.400" />}
        variant="filled"
        fontSize={14}
        backgroundColor={'white'}
    />
  )
}

export default SearchBar