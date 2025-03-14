import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from 'react-native-maps';
import type { MapViewProps } from './MapView';

export default function MapViewNative({ region, onRegionChange, style }: MapViewProps) {
  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_DEFAULT}
      region={region}
      onRegionChangeComplete={onRegionChange}
    >
      {/* OpenStreetMap tile overlay */}
      <UrlTile 
        urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      
      {/* Example marker */}
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title="Your Location"
        description="This is your current selected location"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
