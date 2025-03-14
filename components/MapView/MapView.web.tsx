import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import type { MapViewProps } from './MapView';

// A simple placeholder component
const MapPlaceholder = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Loading map...</Text>
  </View>
);

export default function MapViewWeb(props: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <MapPlaceholder />;
  }
  
  // Simple placeholder for web that shows coordinates
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.title}>Map View</Text>
        <Text style={styles.coordinates}>
          Location: {props.region.latitude.toFixed(4)}, {props.region.longitude.toFixed(4)}
        </Text>
        <Text style={styles.note}>
          The map is currently in development for web.
        </Text>
        <Text style={styles.note}>
          Please check the mobile app for the full map experience.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5f5f5',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#555',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4285F4',
  },
  coordinates: {
    fontSize: 16,
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  }
});
