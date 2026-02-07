import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotesCard({ notes = [] }: { notes?: string[] }) {
  if (notes.length === 0) return null;

  return (
    <Surface elevation={0} style={styles.card}>
      {/* 1. Header with 'System Alert' feel */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="shield-alert-outline" size={20} color="#ff4b2b" />
        </View>
        <Text style={styles.title}>Essential Guidelines</Text>
      </View>

      <View style={styles.content}>
        {notes.map((n, i) => (
          <View key={i} style={styles.noteRow}>
            <MaterialCommunityIcons 
              name="rhombus-medium" 
              size={12} 
              color="#ff4b2b" 
              style={{ marginTop: 4 }} 
            />
            <Text style={styles.noteText}>{n}</Text>
          </View>
        ))}
      </View>

      {/* 2. Subtext to reinforce the 'Adaptive City' theme */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Updated based on local UAE regulations</Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginVertical: 12, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255, 75, 43, 0.05)', // Subtle Red/Orange tint
    borderWidth: 1,
    borderColor: 'rgba(255, 75, 43, 0.2)',
    overflow: 'hidden'
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: 'rgba(255, 75, 43, 0.1)',
    gap: 12
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 75, 43, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#ff4b2b', 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  content: { padding: 16 },
  noteRow: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 12,
    alignItems: 'flex-start'
  },
  noteText: { 
    fontSize: 14, 
    color: '#eee', 
    lineHeight: 20,
    flex: 1 
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic'
  }
});