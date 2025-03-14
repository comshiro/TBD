import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  TouchableOpacity, 
  Animated 
} from 'react-native';

import OnboardingSlide from '../components/OnboardingSlide';
import SignupSlide from '../components/SignupSlide';
import { onboardingData } from '../constants/OnboardingData';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Use expo-router instead of custom navigation
  const router = useRouter();

  const navigateToTabs = () => {
    router.replace('/(tabs)');
  };

  const viewConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length) {
      setCurrentIndex(currentIndex + 1);
      slidesRef.current!.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigateToTabs();
    }
  };

  const skipToSignup = () => {
    slidesRef.current!.scrollToIndex({ index: onboardingData.length - 1 });
  };

  const handleComplete = () => {
    navigateToTabs();
  };

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View style={styles.container}>
      <View style={styles.slidesContainer}>
        <FlatList
          data={onboardingData}
          renderItem={({ item, index }) => 
            index === onboardingData.length - 1 ? 
              <SignupSlide onComplete={handleComplete} /> : 
              <OnboardingSlide item={item} />
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          scrollEventThrottle={32}
          getItemLayout={getItemLayout}
        />
      </View>
      
      <View style={styles.pagination}>
        {onboardingData.map((_, i: number) => {
          const inputRange: number[] = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View 
              style={[styles.dot, { width: dotWidth, opacity }]} 
              key={i.toString()} 
            />
          );
        })}
      </View>
      
      <View style={styles.buttonContainer}>
        {currentIndex < onboardingData.length - 1 ? (
          <>
            <TouchableOpacity style={styles.skipButton} onPress={skipToSignup}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slidesContainer: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4285F4',
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
  },
  nextText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
