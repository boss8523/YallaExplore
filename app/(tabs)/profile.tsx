import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Surface, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';

export default function Profile() {
  return (
    <View style={styles.background}>
      <LinearGradient
        colors={['#0F2027', '#203A43']}
        style={StyleSheet.absoluteFill}
      />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 1. Profile Header Section */}
        <View style={styles.headerSection}>
          <Surface elevation={4} style={styles.avatarGlow}>
            <Avatar.Icon size={80} icon="account" backgroundColor="#00d2ff" color="#0F2027" />
          </Surface>
          <ThemedText style={styles.userName}>UAE Explorer</ThemedText>
          <View style={styles.rankBadge}>
            <MaterialCommunityIcons name="shield-check" size={14} color="#FFD700" />
            <ThemedText style={styles.rankText}>Verified Resident</ThemedText>
          </View>
        </View>

        {/* 2. Passport Cards (Glassmorphism) */}
        <SectionItem 
          title="Saved Places" 
          subtitle="No saved locations identified yet." 
          icon="bookmark-multiple-outline" 
          color="#00d2ff" 
        />
        
        <SectionItem 
          title="Saved Itineraries" 
          subtitle="Explore the UAE to build your log." 
          icon="map-clock-outline" 
          color="#FFD700" 
        />

        <SectionItem 
          title="Travel Preferences" 
          subtitle="Eco-conscious · Luxury · Relaxed pace" 
          icon="tune-variant" 
          color="#00ff88" 
        />

        {/* 3. Footer Actions */}
        <View style={styles.footer}>
          <Button 
            mode="contained" 
            onPress={() => {}} 
            style={styles.exportBtn}
            contentStyle={{ height: 50 }}
            icon="database-export"
          >
            Export Travel Log
          </Button>
          <ThemedText style={styles.versionText}>System Version 1.0.4-Adaptive</ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

// Reusable Glass Component for Passport Items
function SectionItem({ title, subtitle, icon, color }: any) {
  return (
    <Surface elevation={0} style={styles.glassCard}>
      <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.cardContent}>
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#444" />
    </Surface>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 24, paddingTop: 60, paddingBottom: 120 },
  headerSection: { alignItems: 'center', marginBottom: 40 },
  avatarGlow: {
    borderRadius: 40,
    shadowColor: '#00d2ff',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginBottom: 15,
  },
  userName: { fontSize: 24, fontWeight: '800', color: '#fff' },
  rankBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 215, 0, 0.1)', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 20,
    marginTop: 8,
    gap: 6
  },
  rankText: { color: '#FFD700', fontSize: 12, fontWeight: '700' },
  glassCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: { flex: 1 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardSubtitle: { color: '#888', fontSize: 13, marginTop: 2 },
  footer: { marginTop: 20, alignItems: 'center' },
  exportBtn: { width: '100%', borderRadius: 15, backgroundColor: '#00d2ff' },
  versionText: { color: '#444', fontSize: 10, marginTop: 15, letterSpacing: 1 }
});