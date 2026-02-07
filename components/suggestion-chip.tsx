import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function SuggestionChip({ text, onPress }: { text: string; onPress?: (t: string) => void }) {
  const scale = useSharedValue(1);

  // Smooth haptic-like animation on press
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => (scale.value = withSpring(0.95));
  const handlePressOut = () => (scale.value = withSpring(1));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(text)}
        style={styles.chip}
      >
        <MaterialCommunityIcons name="auto-fix" size={14} color="#00d2ff" style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 210, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 99,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.3)',
    // Subtle glow
    shadowColor: '#00d2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 6,
    opacity: 0.8,
  },
  text: {
    color: '#00d2ff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});