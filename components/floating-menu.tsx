import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  withSpring, 
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSharedValue(0);
  const router = useRouter();

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    animation.value = withSpring(toValue, { friction: 5 });
    setIsOpen(!isOpen);
  };

  const navigateTo = (path: string) => {
    toggleMenu();
    router.push(path);
  };

  // 1. Center Button Rotation
  const mainBtnStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(animation.value, [0, 1], [0, 135])}deg` }]
  }));

  // 2. Individual Item Animations (Staggered)
  const createItemStyle = (index: number) => useAnimatedStyle(() => {
    const translateY = interpolate(animation.value, [0, 1], [0, -70 * (index + 1)]);
    const opacity = interpolate(animation.value, [0, 0.5, 1], [0, 0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const MENU_ITEMS = [
    { icon: 'card-account-details-outline', label: 'Passport', path: '/profile' },
    { icon: 'compass-outline', label: 'Explore', path: '/explore' },
    { icon: 'chat-plus-outline', label: 'New Chat', path: '/' },
  ];

  return (
    <View style={styles.container}>
      {/* Background Dimmer when open */}
      {isOpen && (
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleMenu} />
      )}

      {/* Floating Items */}
      {MENU_ITEMS.map((item, i) => (
        <Animated.View key={i} style={[styles.itemWrapper, createItemStyle(i)]}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <Pressable style={styles.subButton} onPress={() => navigateTo(item.path)}>
            <MaterialCommunityIcons name={item.icon as any} size={22} color="#fff" />
          </Pressable>
        </Animated.View>
      ))}

      {/* Main Trigger Button */}
      <Animated.View style={[styles.mainButton, mainBtnStyle]}>
        <Pressable onPress={toggleMenu} style={styles.pressArea}>
          <MaterialCommunityIcons name="menu" size={32} color="#0F2027" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: "15%",
    right: 20,
    alignItems: 'center',
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00d2ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#00d2ff',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  pressArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  itemWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 80,
    top: 150,
   
   
  },
  itemLabel: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 15,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  subButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1c252a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  }
});