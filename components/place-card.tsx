import React from 'react';
import { View, StyleSheet, Pressable, Linking, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PlaceCard({ place }: any) {
  
  const handleDirections = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${place.latitude},${place.longitude}`;
    const label = place.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    
    if (url) Linking.openURL(url);
  };

  return (
    <Surface elevation={0} style={styles.card}>
      <View style={styles.content}>
        {/* 1. Header: Name and Rating */}
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{place.name}</Text>
          <View style={styles.ratingBadge}>
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>

        {/* 2. Category & Emirate Tags */}
        <View style={styles.tagRow}>
          <View style={[styles.tag, { backgroundColor: 'rgba(0, 210, 255, 0.15)' }]}>
            <Text style={[styles.tagText, { color: '#00d2ff' }]}>{place.category}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{place.emirate}</Text>
          </View>
        </View>

        {/* 3. Description */}
        <Text style={styles.description}>
          {place.short_description}
        </Text>

        {/* 4. Action Row: Location & Directions */}
        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color="#888" />
            <Text style={styles.locationText} numberOfLines={1}>
              {place.exact_location}
            </Text>
          </View>
          
          <Pressable onPress={handleDirections} style={styles.directionBtn}>
            <MaterialCommunityIcons name="navigation-variant" size={18} color="#0F2027" />
            <Text style={styles.directionBtnText}>GO</Text>
          </Pressable>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: 16, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  },
  content: { padding: 20 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10 
  },
  title: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#fff', 
    flex: 1, 
    marginRight: 10 
  },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 215, 0, 0.1)', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 10,
    gap: 4
  },
  ratingText: { color: '#FFD700', fontWeight: 'bold', fontSize: 12 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tag: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  tagText: { color: '#ccc', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  description: { 
    fontSize: 14, 
    color: '#aaa', 
    lineHeight: 20, 
    marginBottom: 18 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 15
  },
  locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 4 },
  locationText: { color: '#777', fontSize: 12 },
  directionBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#00d2ff', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 12,
    gap: 4,
    shadowColor: '#00d2ff',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  directionBtnText: { color: '#0F2027', fontWeight: '900', fontSize: 12 }
});