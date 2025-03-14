import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import MapView from '@/components/MapView';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 40.7128, // Default to New York City
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={setRegion}
          />
        </View>
        
        <View style={styles.infoPanel}>
          <Text style={styles.title}>Accessible Routes</Text>
          <Text style={styles.subtitle}>
            Find and navigate accessible paths that suit your needs
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60, // Add space for tab bar
  },
  mapContainer: {
    height: height * 0.6, // Reduced height to avoid overlap
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4285F4',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});
