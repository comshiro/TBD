import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Define a consistent blue color for active tabs
  const activeColor = '#4285F4';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
            borderTopWidth: 1,
            elevation: 8, // for Android
            shadowColor: '#000', // for iOS
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            height: 60,
            paddingBottom: 5,
          },
          android: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
            borderTopWidth: 1,
            elevation: 8,
            height: 60,
            paddingBottom: 5,
          },
          default: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 5,
          },
        }),
        tabBarBackground: TabBarBackground,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size} 
              color={focused ? activeColor : 'gray'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'map' : 'map-outline'} 
              size={size} 
              color={focused ? activeColor : 'gray'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size} 
              color={focused ? activeColor : 'gray'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
