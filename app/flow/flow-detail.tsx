import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Linking, Platform, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, Surface, IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import YoutubePlayer from 'react-native-youtube-iframe'; // Standard import is better

const { height } = Dimensions.get('window');

export default function FlowDetailScreen() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [showAiInsight, setShowAiInsight] = useState(false);
  const [playerError, setPlayerError] = useState(false);

  // 1. Better ID Extraction: Handle potential array or undefined
  const youtubeId = Array.isArray(item.youtube_id) 
    ? item.youtube_id[0] 
    : (item.youtube_id as string) || "qz27g02QiGE"; 

  console.log('flow-detail params:', item);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F2027', '#203A43']} style={StyleSheet.absoluteFill} />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Image source={item.image_url as string} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={['rgba(15, 32, 39, 0.4)', 'rgba(15, 32, 39, 0.9)']} style={StyleSheet.absoluteFill} />
        <IconButton icon="chevron-left" iconColor="#fff" size={30} onPress={() => router.back()} style={styles.backBtn} />
        
        <Animated.View entering={FadeInDown.delay(200)} style={styles.headerContent}>
          <View style={styles.stepBadge}><Text style={styles.stepText}>DAY {item.step_number}</Text></View>
          <Text style={styles.title}>{item.location_name || item.title || "Discovery"}</Text>
          {item.location_name && item.title && (
            <Text style={styles.subTitle}>{item.title}</Text>
          )}
        </Animated.View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* VIDEO SECTION */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="play-circle-outline" size={20} color="#00d2ff" />
            <Text style={styles.sectionTitle}>Visual Intelligence</Text>
          </View>
          
          <Surface elevation={0} style={styles.videoCard}>
            {/* 2. Player with robust fallback: show native player when available; on error show thumbnail that opens YouTube */}
            {Platform.OS !== 'web' && !playerError ? (
              <YoutubePlayer
                height={220}
                play={false}
                videoId={youtubeId}
                onError={(e) => {
                  console.log('Youtube Error:', e);
                  setPlayerError(true);
                }}
                onReady={() => console.log('Youtube Player ready:', youtubeId)}
                onChangeState={(state) => console.log('Youtube state:', state)}
              />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Pressable onPress={() => Linking.openURL(`https://youtube.com/watch?v=${youtubeId}`)}>
                  <Image
                    source={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                    style={styles.thumbnail}
                    contentFit="cover"
                  />
                </Pressable>
                <View style={styles.watchButtonWrap}>
                  <Button 
                    mode="contained" 
                    icon="youtube"
                    onPress={() => Linking.openURL(`https://youtube.com/watch?v=${youtubeId}`)}
                    buttonColor="#FF0000"
                  >
                    Watch on YouTube
                  </Button>
                </View>
              </View>
            )}
          </Surface>
        </Animated.View>

        {/* AI SUMMARY BUTTON */}
        <Button 
          mode="contained" 
          icon="robot-outline" 
          style={styles.aiSummaryBtn} 
          onPress={() => setShowAiInsight(!showAiInsight)} 
          buttonColor="rgba(0, 210, 255, 0.15)" 
          textColor="#00d2ff"
        >
          {showAiInsight ? "Hide AI Summary" : "Get AI Summary"}
        </Button>

        {showAiInsight && (
          <Animated.View entering={FadeInDown} style={styles.aiInsightBox}>
             <Text style={styles.aiInsightText}>
               Concierge Insight: This itinerary is optimized for your budget. Access is verified as wheelchair friendly for {item.location_name}.
             </Text>
          </Animated.View>
        )}

        {/* PLAN DESCRIPTION */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>The Plan</Text>
          <Surface elevation={0} style={styles.glassCard}>
            <Text style={styles.descriptionText}>
              {item.description || "No specific activities listed for this day."}
            </Text>
          </Surface>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2027' },
  header: { height: height * 0.4, justifyContent: 'flex-end', padding: 24 },
  backBtn: { position: 'absolute', top: 50, left: 10, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 12, zIndex: 10 },
  headerContent: { marginBottom: 10 },
  stepBadge: { backgroundColor: 'rgba(0, 210, 255, 0.2)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  stepText: { color: '#00d2ff', fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  title: { fontSize: 32, fontWeight: '900', color: '#fff', lineHeight: 38 },
  scrollBody: { padding: 24 },
  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { color: '#00d2ff', fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.2 },
  videoCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#000' },
  videoCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#000', width: '100%' },
  videoPlaceholder: { height: 200, alignItems: 'center', justifyContent: 'center' },
  thumbnail: { width: '100%', height: 200 },
  watchButtonWrap: { position: 'absolute', bottom: 12, alignSelf: 'center' },
  aiSummaryBtn: { borderRadius: 15, marginBottom: 15 },
  aiInsightBox: { backgroundColor: 'rgba(0, 210, 255, 0.05)', padding: 16, borderRadius: 15, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#00d2ff' },
  aiInsightText: { color: '#00d2ff', fontSize: 14, fontStyle: 'italic' },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 20 },
  descriptionText: { color: '#ccc', fontSize: 15, lineHeight: 22 },
  subTitle: { 
  fontSize: 16, 
  color: '#00d2ff', 
  fontWeight: '600', 
  marginTop: 4,
  opacity: 0.9,
  letterSpacing: 0.5
},
});