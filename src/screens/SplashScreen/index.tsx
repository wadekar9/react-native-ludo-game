import { Image, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '$components/Wrapper'
import { styles } from './styles'
import { IMAGES } from '$assets/images'
import { COLORS } from '$constants/colors'
import { resetAndNavigate } from '$helpers/navigationUtils'

const SplashScreen: React.FC = () => {

  const [isStop] = useState(false);
  const scale = new Animated.Value(1);

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate('HomeScreen');
    },1500);
  },[]);

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }),
      ])
    )

    if (!isStop) {
      breathingAnimation.start();
    }

    return () => {
      breathingAnimation.stop();
    }
  }, [isStop]);

  return (
    <Wrapper>
      <Animated.View
        style={[styles.imgContainer, { transform: [{ scale }] }]}
      >
        <Image resizeMode={'contain'} source={IMAGES.Logo} style={styles.img} />
      </Animated.View>

      <ActivityIndicator size={'large'} color={COLORS.white} />
    </Wrapper>
  )
}

export default SplashScreen