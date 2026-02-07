import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Linking, ActivityIndicator, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAi } from '@/app/context/ai-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Surface, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';

import FlowCard from '@/components/flow-card';
import PlaceCard from '@/components/place-card';
import NotesCard from '@/components/notes-card';
import TipsCard from '@/components/tips-card';
import SuggestionChip from '@/components/suggestion-chip';
import MapViewComponent from '@/components/map-view-component';
import { STRAPI_API_KEY, STRAPI_URL } from '@/constants/API';

const { width } = Dimensions.get('window');

export default function Results() {
  const { id } = useLocalSearchParams();
  const { askAI, loading: aiLoading } = useAi();
  const router = useRouter();
  
  const [finalData, setFinalData] = useState<any>(null);
  const [fetching, setFetching] = useState(false);
  const [isOutsideUAE, setIsOutsideUAE] = useState(false);

  useEffect(() => {
    // 1. Location Logic
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      if (reverseGeocode[0]?.country !== 'United Arab Emirates') setIsOutsideUAE(true);
    })();

    // 2. Fetch Logic
    if (id) fetchItinerary();
  }, [id]);

const fetchItinerary = async () => {
  try {
    setFetching(true);
    // This tells Strapi: "Give me the dayPlans, and everything inside them"
const url = `${STRAPI_URL}/api/itineraries/${id}?populate[dayPlans][populate]=*&populate[touristLocations][populate]=*`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${STRAPI_API_KEY}` }
    });
    
    const json = await response.json();

    if (json.data) {
      // Strapi usually wraps fields in 'attributes'
      const rawData = json.data.attributes ? json.data.attributes : json.data;
      
      // LOG THIS: To make sure dayPlans exists here
      console.log("FINAL DATA LOADED:", rawData.dayPlans);
      
      setFinalData(rawData);
    }
  } catch (e) {
    console.error("Fetch Error:", e);
  } finally {
    setFetching(false);
  }
};

  if (fetching || aiLoading || !finalData) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00d2ff" />
      </ThemedView>
    );
  }

  const markers = (finalData.touristLocations || []).map((l: any) => ({
    title: l.name,
    latitude: l.coordinates?.lat || 25.2,
    longitude: l.coordinates?.lng || 55.3
  }));

  const openBooking = (type: 'hotel' | 'flight') => {
    const city = finalData.touristLocations?.[0]?.name || 'Dubai';
    const url = type === 'hotel' 
      ? `https://www.booking.com/searchresults.html?ss=${city}`
      : `https://www.skyscanner.net/transport/flights-from/anywhere/to/${city.toLowerCase()}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F2027' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(600)} style={styles.mapContainer}>
          <MapViewComponent markers={markers} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={['transparent', 'rgba(15, 32, 39, 0.8)', '#0f202729']} style={styles.mapOverlay} />
        </Animated.View>

        <View style={styles.heroContent}>
          <ThemedText style={styles.summaryTitle}>{finalData.title}</ThemedText>
          <ThemedText style={styles.summaryText}>{finalData.summary}</ThemedText>
        </View>

        <View style={styles.contentPadding}>
           <ThemedText style={styles.sectionTitle}>Booking Concierge</ThemedText>
           <Surface elevation={0} style={styles.bookingCard}>
              <View style={styles.bookingRow}>
                <MaterialCommunityIcons name={isOutsideUAE ? "airplane-takeoff" : "office-building-marker"} size={24} color="#00d2ff" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <ThemedText style={styles.bookingTitle}>{isOutsideUAE ? "International Logistics" : "Local Accommodations"}</ThemedText>
                  <ThemedText style={styles.bookingSub}>{isOutsideUAE ? "Secure your tickets to the UAE." : "Find the best stay near your planned destinations."}</ThemedText>
                </View>
              </View>
              <View style={styles.actionRow}>
                {isOutsideUAE && <Button mode="contained" onPress={() => openBooking('flight')} style={[styles.bookBtn, { backgroundColor: '#ff4b2b' }]}>Flights</Button>}
                <Button mode="contained" onPress={() => openBooking('hotel')} style={[styles.bookBtn, { backgroundColor: '#00ff88' }]} textColor="#0F2027">Hotels</Button>
              </View>
           </Surface>
        </View>

  {/* 4. TIMELINE SECTION (The Journey) */}
<View style={styles.sectionHeaderContainer}>
   <ThemedText style={styles.sectionTitle}>The Journey</ThemedText>
</View>

<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false} 
  contentContainerStyle={styles.flowScroll}
>
  {finalData.dayPlans?.map((day: any, i: number) => {
    const relatedLocation = finalData.touristLocations?.[i];
    console.log('====================================');
    console.log(relatedLocation);
    console.log('====================================');
    return (
      <Animated.View key={i} entering={FadeInRight.delay(i * 100)}>
<Pressable onPress={() => {
  router.push({
    pathname: '/flow/flow-detail', // Ensure this path is correct!
    params: {
      step_number: day.dayNumber,
      location_name: relatedLocation?.name || day.locationTheme,
      title: day.locationTheme, 
      description: day.activities, // This must match the key in your Strapi/AI response
      youtube_id: relatedLocation?.youtubeVideos?.[0]?.videoID || "qz27g02QiGE", 
      image_url: relatedLocation?.images?.[0]?.url || "https://images.unsplash.com/photo-1512453979798-5eaad0ff3b0d",
    }
  });
}}>
          <FlowCard 
            item={{ 
              step_number: day.dayNumber,
              title: `Day ${day.dayNumber}`, 
              description: day.locationTheme,
              estimated_time: relatedLocation?.durationMinutes ? `${relatedLocation.durationMinutes}m` : "1-2h",
              best_time_to_visit: relatedLocation?.bestTimeToVisit || "Morning",
              why_this_step_is_recommended: `Accessible and matches ${finalData.budgetLevel} budget.`
            }} 
          />
        </Pressable>
      </Animated.View>
    );
  })}
</ScrollView>

<View style={styles.contentPadding}>
  <ThemedText style={styles.sectionTitle}>Key Destinations</ThemedText>
  {finalData.touristLocations?.map((p: any, i: number) => (
    <Animated.View key={i} entering={FadeInUp.delay(400 + i * 100)}>
      <PlaceCard 
        place={{
          name: p.name,
          rating: p.averageRating || "5.0",
          category: p.category || "Discovery",
          emirate: p.destination?.name || "Sharjah",
          short_description: p.history || "Explore the rich heritage and beauty of this location.",
          exact_location: p.accessibilityNotes || p.category,
          latitude: p.coordinates?.lat || 25.3463,
          longitude: p.coordinates?.lng || 55.4209,
        }} 
      />
    </Animated.View>
  ))}

  {/* CONCIERGE INSIGHTS SECTION */}
  <Animated.View entering={FadeInUp.delay(500)} style={styles.section}>
    <ThemedText style={styles.sectionTitle}>Concierge Intelligence</ThemedText>
    
    <View style={styles.glassContainer}>
      {finalData.culturalNotice ? (
        <NotesCard notes={[finalData.culturalNotice]} />
      ) : null}

      {/* 2. Quick Specs (Budget, Duration, Dates) */}
      <TipsCard 
        tips={[
          `Investment: ${finalData.budgetLevel} Level`, 
          `Timeline: ${finalData.totalDays} Full Days`,
          `Schedule: ${finalData.travelDates}`
        ]} 
      />
    </View>
  </Animated.View>
</View>

        <View style={{ height: 120 }} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F2027' },
  mapContainer: { height: 350, width: '100%' },
  mapOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 },
  heroContent: { paddingHorizontal: 20, marginTop: -20, marginBottom: 20 ,backgroundColor: 'rgba(15, 32, 39, 0.87)', paddingVertical: 20, borderRadius: 20 },
  summaryTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 10 },
  summaryText: { fontSize: 16, color: '#ccc', lineHeight: 24 },
  sectionHeaderContainer: { backgroundColor: '#0F2027', paddingVertical: 10, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#00d2ff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 15 },
  flowScroll: { paddingLeft: 20, paddingRight: 20, marginBottom: 25 },
  contentPadding: { paddingHorizontal: 20 },
  glassContainer: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  bookingCard: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(0, 210, 255, 0.2)', marginBottom: 30 },
  bookingRow: { flexDirection: 'row', alignItems: 'flex-start' },
  bookingTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bookingSub: { color: '#888', fontSize: 13, marginTop: 4, lineHeight: 18 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  bookBtn: { flex: 1, borderRadius: 12 },
  // Inside NotesCard Styles
noteText: { 
  fontSize: 14, 
  color: '#E0E0E0', // Slightly brighter for dark mode readability
  lineHeight: 22,   // Increased breathing room for long AI notices
  flex: 1,
  fontWeight: '500'
},
});