import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Linking, Text, Platform, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // 1. Import Map
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function MapViewComponent({ markers = [] }: { markers: any[] }) {
  const [activeMarker, setActiveMarker] = useState(0);
  const mapRef = useRef<MapView>(null); // 2. Create a reference to the map

  const currentMarker = markers[activeMarker];

  // 3. Effect to animate map when activeMarker changes
  useEffect(() => {
    if (currentMarker && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentMarker.latitude,
        longitude: currentMarker.longitude,
        latitudeDelta: 0.05, // Zoom level
        longitudeDelta: 0.05,
      }, 1000); // 1 second animation
    }
  }, [activeMarker]);

  const handleNavigate = (marker: any) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${marker.latitude},${marker.longitude}`;
    const label = marker.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* 4. REAL INTERACTIVE MAP */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Use Google Maps on both iOS/Android
        initialRegion={{
          latitude: markers[0]?.latitude || 25.2048,
          longitude: markers[0]?.longitude || 55.2708,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={mapStyle} // Optional: Dark Mode
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            pinColor={activeMarker === i ? '#00d2ff' : '#ff4b2b'}
            onPress={() => setActiveMarker(i)}
          />
        ))}
      </MapView>

      {/* Keep your Current Location Info and Carousel exactly as they were */}
      {/* ... (Rest of your original UI code) ... */}
    </View>
  );
}

// 5. Dark Theme for the Map (Optional but looks great with your UI)
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#1d2c33" }] // Changed from #212121 to a slightly lighter blue-grey
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#00d2ff" }] // Makes text match your brand blue
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#070b0d" }] // Darker water for high contrast
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#2c3e50" }] // Lighter roads so you can actually see the routes
  }
];
const styles = StyleSheet.create({
  container: { height: 380, width: '100%', backgroundColor: '#12191c', borderRadius: 20, overflow: 'hidden' },
  map: { flex: 1 }, // Map fills the top area
  // ... (Your existing styles) ...
});