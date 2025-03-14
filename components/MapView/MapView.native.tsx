import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { default as RNMapView, PROVIDER_DEFAULT, UrlTile, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import type { MapViewProps } from './MapView';

export default function MapViewNative({ region, onRegionChange, style }: MapViewProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [followingUser, setFollowingUser] = useState(false);

  // Request and track location
  useEffect(() => {
    (async () => {
      try {
        // Ask for location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setUserLocation(location);
        
        // Update map region with user location if we should follow user
        if (followingUser && onRegionChange) {
          onRegionChange({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      } catch (err) {
        console.error("Error getting location:", err);
        setErrorMsg('Failed to get location');
      }
    })();
  }, [followingUser]);

  const handleLocateMe = () => {
    if (userLocation) {
      // Toggle following user
      setFollowingUser(!followingUser);
      
      if (!followingUser && onRegionChange) {
        // If not already following user, center map on user location
        onRegionChange({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    } else if (errorMsg) {
      Alert.alert(
        "Location Error",
        errorMsg,
        [{ text: "OK" }]
      );
    }
  };

  const onMapReady = () => {
    setIsMapReady(true);
  };

  // Handle map loading state
  if (!isMapReady) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator 
          size="large"
          color="#4285F4"
          style={styles.loadingIndicator} 
        />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNMapView
        style={[styles.map, style]}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={false} // We'll use our own button
        showsCompass={true}
        showsScale={true}
        toolbarEnabled={false}
        onMapReady={onMapReady}
        loadingEnabled={true}
        loadingIndicatorColor="#4285F4"
        loadingBackgroundColor="#f8f8f8"
      >
        {/* OpenStreetMap tile overlay */}
        <UrlTile 
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        
        {/* Example marker for current map center */}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          pinColor="#4285F4"
          title="Selected Location"
          description="This is your current selected location"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Selected Location</Text>
              <Text>
                {region.latitude.toFixed(5)}, {region.longitude.toFixed(5)}
              </Text>
            </View>
          </Callout>
        </Marker>
      </RNMapView>
      
      {/* Locate me button */}
      <TouchableOpacity 
        style={[
          styles.locateMeButton, 
          followingUser ? styles.activeButton : {}
        ]} 
        onPress={handleLocateMe}
      >
        <Ionicons 
          name="locate" 
          size={24} 
          color={followingUser ? "#fff" : "#4285F4"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locateMeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  activeButton: {
    backgroundColor: '#4285F4',
  },
  calloutContainer: {
    width: 160,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingIndicator: {
    marginBottom: 10,
  },
  loadingText: {
    color: '#555',
    fontSize: 16,
  },
});
