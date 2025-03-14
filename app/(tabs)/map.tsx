import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView from '@/components/MapView';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 40.7128, // Default to New York City
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  // Accessibility filter states
  const [showingWheelchairRoutes, setShowingWheelchairRoutes] = useState(false);
  const [showingElevators, setShowingElevators] = useState(false);
  const [showingRestrooms, setShowingRestrooms] = useState(false);
  const [showingBenches, setShowingBenches] = useState(false);

  const handleRegionChange = (newRegion: any) => {
    setRegion(newRegion);
  };

  const toggleWheelchairRoutes = () => {
    setShowingWheelchairRoutes(!showingWheelchairRoutes);
    // Here you would actually filter map data
  };
  
  const toggleElevators = () => {
    setShowingElevators(!showingElevators);
    // Here you would actually filter map data
  };
  
  const toggleRestrooms = () => {
    setShowingRestrooms(!showingRestrooms);
    // Here you would actually filter map data
  };
  
  const toggleBenches = () => {
    setShowingBenches(!showingBenches);
    // Here you would actually filter map data
  };

  // Function to render icons from different icon libraries
  const renderIcon = (type: string, name: string, size: number, color: string) => {
    if (type === 'material') {
      return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
    }
    return <Ionicons name={name as any} size={size} color={color} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={handleRegionChange}
          />
        </View>
        
        <View style={styles.filterBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
            <TouchableOpacity 
              style={[styles.filterButton, showingWheelchairRoutes && styles.activeFilter]} 
              onPress={toggleWheelchairRoutes}
            >
              <View style={styles.iconContainer}>
                {renderIcon('material', 'wheelchair-accessibility', 22, showingWheelchairRoutes ? "#fff" : "#555")}
              </View>
              <Text style={[styles.filterText, showingWheelchairRoutes && styles.activeFilterText]}>Wheelchair</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterButton, showingElevators && styles.activeFilter]} 
              onPress={toggleElevators}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="arrow-up" size={22} color={showingElevators ? "#fff" : "#555"} />
              </View>
              <Text style={[styles.filterText, showingElevators && styles.activeFilterText]}>Elevators</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterButton, showingRestrooms && styles.activeFilter]} 
              onPress={toggleRestrooms}
            >
              <View style={styles.iconContainer}>
                {renderIcon('material', 'toilet', 22, showingRestrooms ? "#fff" : "#555")}
              </View>
              <Text style={[styles.filterText, showingRestrooms && styles.activeFilterText]}>Restrooms</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterButton, showingBenches && styles.activeFilter]} 
              onPress={toggleBenches}
            >
              <View style={styles.iconContainer}>
                {renderIcon('material', 'bench-seat', 22, showingBenches ? "#fff" : "#555")}
              </View>
              <Text style={[styles.filterText, showingBenches && styles.activeFilterText]}>Benches</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <View style={styles.infoPanel}>
          <Text style={styles.title}>Accessible Routes</Text>
          <Text style={styles.subtitle}>
            Find and navigate accessible paths that suit your needs
          </Text>
          
          <TouchableOpacity style={styles.routeButton}>
            <Ionicons name="navigate" size={22} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Find Accessible Route</Text>
          </TouchableOpacity>
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterScrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#4285F4',
  },
  filterText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#555',
  },
  activeFilterText: {
    color: '#fff',
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
    marginBottom: 20,
  },
  routeButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
