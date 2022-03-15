import { Text, StyleSheet } from 'react-native'
import React from 'react'

const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');

    // TODO: create privacy policy page
};

const PrivacyPolicy = ({ text }) => {
  return (
    <>
        <Text style={styles.text}>
            By {text} you are agreeing to our{' '}
            <Text style={styles.link} onPress={onPrivacyPressed}>Terms and Privacy Policy</Text>
        </Text>
    </>
  )
}

const styles = StyleSheet.create({
    text: {
        color: 'gray',
        marginVertical: 10,
      },
      link: {
        color: '#FDB075',
      },
});
export default PrivacyPolicy