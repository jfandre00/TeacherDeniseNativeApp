import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'; // Removido TouchableOpacity e StyleSheet
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
// REMOVIDO: import * as Speech from 'expo-speech';

import { styles as globalStyles, COLORS } from '../styles/styles';

export default function Card({ word, onSwipeLeft, onSwipeRight, onLongPress }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    setIsFlipped(false);
  }, [word, opacity]);

  // REMOVIDA a função speakWord daqui.

  const springConfig = { damping: 25, stiffness: 80, mass: 1 };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = interpolate(event.translationX, [-200, 0, 200], [-10, 0, 10], 'clamp');
    })
    .onEnd((event) => {
      if (event.translationX > 80) {
        translateX.value = withSpring(500, springConfig);
        runOnJS(onSwipeRight)();
      } else if (event.translationX < -80) {
        translateX.value = withSpring(-500, springConfig);
        runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withSpring(0, springConfig);
        rotate.value = withSpring(0, springConfig);
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => runOnJS(setIsFlipped)(!isFlipped));

  const longPressGesture = Gesture.LongPress()
    .minDuration(1000)
    .onStart(() => runOnJS(onLongPress)(word));

  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture, longPressGesture);

  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const frontCardStyle = { ...globalStyles.cardFace, backgroundColor: COLORS.primary };
  const backCardStyle = { ...globalStyles.cardFace, backgroundColor: COLORS.secondary };

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[globalStyles.cardContainer, animatedCardStyle]}>
        {isFlipped ? (
          <View style={backCardStyle}>
            <Text style={globalStyles.cardText}>{word.pt}</Text>
          </View>
        ) : (
          <View style={frontCardStyle}>
            <Text style={globalStyles.cardText}>{word.en}</Text>
            {/* REMOVIDO o botão de áudio daqui. */}
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

// REMOVIDOS os estilos locais do botão de áudio.