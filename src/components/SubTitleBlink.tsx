import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { HomeSubTitle } from '../styles';

const BlinkingSubTitle: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(1)); // valor inicial da opacidade
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // controla a palavra atual
  const words = ['Agendou', 'Confirmou', 'Sorriu 😁']; // palavras que irão piscar

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Atualiza a palavra atual após a animação
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        blink(); 
      });
    };

    blink();

    return () => {
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim, words.length]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <HomeSubTitle>{words[currentWordIndex]}</HomeSubTitle>
    </Animated.View>
  );
};

export default BlinkingSubTitle;