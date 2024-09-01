import { Animated, Text, Image, Alert, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Wrapper from '$components/Wrapper'
import { IMAGES } from '$assets/images'
import { styles } from './styles'
import GradientButton from '$components/GradientButton'
import { useAppDispatch } from '$hooks/useAppStore'
import { resetGame } from '$redux/reducers/gameSlice'
import { playSound, stopSound } from '$helpers/SoundUtils'
import { useSelector } from 'react-redux'
import { selectCurrentPosition } from '$redux/reducers/gameSelectors'
import { useIsFocused } from '@react-navigation/native'
import { navigate } from '$helpers/navigationUtils'
import LottieView from 'lottie-react-native'
import { ANIMATATIONS } from '$assets/animation'
import { DEVICE_WIDTH } from '$constants/dimensions'

const HomeScreen = () => {

  const dispatch = useAppDispatch();
  const currentPosition = useSelector(selectCurrentPosition);
  const isFocused = useIsFocused();

  const withAnim = useRef(new Animated.Value(-DEVICE_WIDTH)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    if (isFocused) {
      playSound('home')
    }
  }, [isFocused])

  useEffect(() => {

    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(withAnim, {
              toValue: DEVICE_WIDTH * 0.02,
              duration: 2000,
              useNativeDriver: true
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 2000,
              useNativeDriver: true
            })
          ]),

          Animated.delay(3000),

          Animated.parallel([
            Animated.timing(withAnim, {
              toValue: DEVICE_WIDTH * 2,
              duration: 8000,
              useNativeDriver: true
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true
            })
          ]),

          Animated.parallel([
            Animated.timing(withAnim, {
              toValue: -DEVICE_WIDTH * 0.05,
              duration: 3000,
              useNativeDriver: true
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true
            })
          ]),

          Animated.delay(3000),

          Animated.parallel([
            Animated.timing(withAnim, {
              toValue: -DEVICE_WIDTH * 2,
              duration: 8000,
              useNativeDriver: true
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true
            })
          ]),
        ])
      ).start();
    }

    const cleanUpAnimation = () => {
      Animated.timing(withAnim).stop();
      Animated.timing(scaleXAnim).stop();
    }

    loopAnimation();

    return cleanUpAnimation;
  }, [withAnim, scaleXAnim])

  const renderButton = useCallback((title: string, onPress: () => void) => {
    return (
      <GradientButton
        title={title}
        onPress={onPress}
      />
    )
  }, [])

  const startGame = async (e: boolean = false) => {
    stopSound();
    if (e) {
      dispatch(resetGame());
    }
    navigate('LudoBoardScreen', {});
    playSound('game_start');
  };

  const handleNewGame = useCallback(() => {
    startGame(true)
  }, []);

  const handleResumeGame = useCallback(() => {
    startGame(false);
  }, []);

  const handleCoomingSoon = useCallback(() => {
    Alert.alert('Cooming Soon')
  }, []);

  return (
    <Wrapper style={{ justifyContent: 'flex-start' }}>
      <Animated.View style={styles.imgContainer}>
        <Image
          source={IMAGES.Logo}
          style={styles.img}
          resizeMode={'contain'}
        />
      </Animated.View>

      {currentPosition.length !== 0 && renderButton("RESUME", handleResumeGame)}
      {renderButton("NEW GAME", handleNewGame)}
      {renderButton("VS Computer", handleCoomingSoon)}
      {renderButton("2 vs 2", handleCoomingSoon)}

      <Animated.View
        style={[
          styles.witchContainer,
          { transform: [{ translateX: withAnim }, { scaleX: scaleXAnim }] },
        ]}
      >
        <Pressable
          onPress={() => {
            const soundName: any = `sound_girl${Math.floor(Math.random() * 4)}`;
            playSound(soundName);
          }}
        >
          <LottieView
            hardwareAccelerationAndroid
            source={ANIMATATIONS.Witch}
            autoPlay
            loop
            speed={1}
            style={styles.witch}
          />
        </Pressable>
      </Animated.View>

      <Text style={styles.labelStyle}>Made by - Nayan</Text>
    </Wrapper>
  )
}

export default HomeScreen