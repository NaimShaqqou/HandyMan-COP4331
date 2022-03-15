import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon, Block, NavBar } from 'galio-framework'
import React from 'react'



const Header = ({ title }) => {
  return (
      <View>
      <Block>
          <NavBar 
            back
            title={title}
            style={styles.navbar}
            leftIconName={'chevron-left'}
            leftIconColor={'#4A4A4A'}
            titleStyle={styles.title}
          />
      </Block>
      </View>
  )
}

const styles = StyleSheet.create({
    navbar: {
        paddingVertical: 0,
        zIndex: 5,
    },
    title: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Header;