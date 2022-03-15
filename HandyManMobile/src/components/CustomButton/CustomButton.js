import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPress, type}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
    container: {
      width: '100%',

      alignItems: 'center',
      borderRadius: 8,
      elevation: 8,
    },

    container_PRIMARY: {
      marginVertical: 10,
      backgroundColor: '#00b2ff',
      padding: 15,
    },
    container_SECONDARY: {
      borderColor: '#00b2ff',
      borderWidth: 2,
    },
    container_TERTIARY: {
      padding: 10,
      marginVertical:5,
    },

    text: {
      fontWeight: 'bold',
    },
    text_PRIMARY: {
      fontSize: 18,
      color: 'white',
    },
    text_SECONDARY: {
      color: '#00b2ff',
    },
    text_TERTIARY: {
      color: 'gray'
    },
});

export default CustomButton