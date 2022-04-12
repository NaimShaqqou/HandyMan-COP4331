import Onboarding from 'react-native-onboarding-swiper';
import { Image, Center } from 'native-base'
import { Button } from 'react-native-paper';
import React from 'react'

import { useNavigation } from '@react-navigation/native'


const OnboardingScreen = () => {
  const navigation = useNavigation();
  const onboardingRef = React.useRef(null);

  return (
    <Onboarding
      ref={onboardingRef}
      showDone={false}
      onSkip={() => onboardingRef.current.goToPage(3, true)}
      pages={[
        {
          backgroundColor: '#1876d2',
          image: <Image source={require('../../assets/OnboardingLogo.png')} borderRadius={60} />,
          title: 'Welcome to HandyMan',
          subtitle: 'Scroll through for an introduction to our application.',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('../../assets/OnboardingLogo.png')} />,
          title: 'Need a helping hand?',
          subtitle: 'You can request a service from one of our experienced handymen.',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../../assets/OnboardingLogo.png')} />,
          title: 'Have a service to offer?',
          subtitle: "Users can request your services at your convenience.",
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../../assets/OnboardingLogo.png')} />,
          title: 'Get Started Today!',
          subtitle: (
            <>
              <Button style={{width: '60%'}} mode='contained' onPress={() => {navigation.navigate('Register')}}>
                Register
              </Button>
              <Button style={{marginTop: 16, width: '60%'}} mode={'outlined'} onPress={() => {navigation.navigate('Login')}}>
                Login
              </Button>
            </>
          ),
        },
      ]}
    />
  )
}

export default OnboardingScreen