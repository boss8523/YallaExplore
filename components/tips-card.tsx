import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TipsCard({ tips = [] }: { tips?: string[] }) {
  if (tips.length === 0) return null;

  return (
    <Surface elevation={0} style={styles.card}>
      {/* 1. Header with 'Insider Knowledge' vibe */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="brain" size={18} color="#00ff88" />
        </View>
        <Text style={styles.title}>Insider Intel</Text>
      </View>

      <View style={styles.content}>
        {tips.map((t, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={styles.bulletContainer}>
               <MaterialCommunityIcons name="check-decagram" size={14} color="#00ff88" />
            </View>
            <Text style={styles.tipText}>{t}</Text>
          </View>
        ))}
      </View>

      {/* 2. Adaptive City Branding */}
      <View style={styles.footer}>
        <MaterialCommunityIcons name="brain" size={12} color="#444" />
        <Text style={styles.footerText}>Optimized by UAE Adaptive Systems</Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginVertical: 12, 
    borderRadius: 24, 
    backgroundColor: 'rgba(0, 255, 136, 0.03)', // Very subtle Emerald tint
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.15)',
    overflow: 'hidden'
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: 'rgba(0, 255, 136, 0.07)',
    gap: 12
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#00ff88', 
    textTransform: 'uppercase', 
    letterSpacing: 1.5 
  },
  content: { padding: 16 },
  tipRow: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  bulletContainer: {
    marginTop: 2
  },
  tipText: { 
    fontSize: 14, 
    color: '#ddd', 
    lineHeight: 20,
    flex: 1,
    fontWeight: '500'
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  footerText: {
    fontSize: 10,
    color: '#555',
    fontWeight: '600'
  }
});