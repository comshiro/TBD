import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import MapViewNative from '../MapView/MapView.native';
import MapViewWeb from '../MapView/MapView.web';

export interface MapViewProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onRegionChange?: (region: any) => void;
  style?: any;
}

export default function MapView(props: MapViewProps) {
  // Select the appropriate implementation based on platform
  const MapComponent = Platform.OS === 'web' ? MapViewWeb : MapViewNative;

  return <MapComponent {...props} />;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});
