import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function FlowCard({ item }: any) {
  return (
    <Surface elevation={0} style={styles.card}>
      {/* 1. Gradient Accent for the Step Number */}
      <LinearGradient
        colors={['#00d2ff', '#3a7bd5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stepBadge}
      >
        <Text style={styles.stepText}>{item.step_number}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* 2. Styled Meta Info */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={14} color="#00d2ff" />
            <Text style={styles.metaText}>{item.estimated_time}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="brightness-6" size={14} color="#FFD700" />
            <Text style={styles.metaText}>{item.best_time_to_visit}</Text>
          </View>
        </View>

        {/* 3. Concierge Insight Section */}
        <View style={styles.insightBox}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={14} color="#00ff88" />
          <Text style={styles.insightText} numberOfLines={2}>
            {item.why_this_step_is_recommended}
          </Text>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginRight: 16, 
    width: width * 0.75, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    padding: 16,
    height: 160,
    overflow: 'hidden'
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#fff', 
    marginBottom: 4 
  },
  description: { 
    fontSize: 13, 
    color: '#aaa', 
    lineHeight: 18,
    marginBottom: 10 
  },
  metaRow: { 
    flexDirection: 'row', 
    gap: 15,
    marginBottom: 10 
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metaText: { 
    fontSize: 11, 
    color: '#ccc',
    fontWeight: '600'
  },
  insightBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    padding: 8,
    borderRadius: 12,
    gap: 6,
    alignItems: 'center'
  },
  insightText: {
    fontSize: 11,
    color: '#00ff88',
    flex: 1,
    fontStyle: 'italic'
  }
});