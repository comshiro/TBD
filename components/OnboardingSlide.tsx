import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, AccessibilityInfo } from 'react-native';
import type { OnboardingItem } from '../constants/OnboardingData';

const { width, height } = Dimensions.get('window');

interface OnboardingSlideProps {
  item: OnboardingItem;
}

export default function OnboardingSlide({ item }: OnboardingSlideProps) {
  console.log(item);
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityRole="image"
    >
      <Image 
        source={item.image} 
        style={styles.image} 
        resizeMode="contain"
        accessibilityIgnoresInvertColors={true}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#4285F4',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
    lineHeight: 26,
  },
});
