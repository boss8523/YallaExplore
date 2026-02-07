import { Image } from 'expo-image';
import { StyleSheet, View, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

const { width, height } = Dimensions.get('window');

// Data for the horizontal "Monteritew" section
const HORIZONTAL_GALLERY = [
  { id: '1', title: 'Louvre Abu Dhabi', likes: '780K', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090' },
  { id: '2', title: 'Modern Gallery', likes: '700K', image: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a' },
  { id: '3', title: 'Art Collection', likes: '700K', image: 'https://images.unsplash.com/photo-1647424224827-39396378e906' },
  { id: '4', title: 'Heritage Site', likes: '790K', image: 'https://images.unsplash.com/photo-1582730147924-d92b4da00252' },
];

// Data for the "Visual Intelligence Feed" list
const INTEL_LIST = [
  { label: 'Gallery Places', value: '1.20M' },
  { label: 'Art Statues', value: '1.20M' },
  { label: 'Gallery List', value: '800M' },
  { label: 'Collections', value: '#500K' },
  { label: 'Discovery Container', value: '800M' },
  { label: 'Key Extractor', value: '#60M' },
  { label: 'Masonry View', value: '#50M' },
];

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0F2027', dark: '#0F2027' }}
      headerImage={
        <View style={styles.hero}>
          <LinearGradient 
            colors={['#0F2027', '#203A43', '#2C5364']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            <Image 
              source="https://images.unsplash.com/photo-1512453979798-5eaad0ff3b0d" 
              style={styles.heroThumbnail} 
              contentFit="cover"
            />
            <View style={styles.heroTextContent}>
              <ThemedText style={styles.heroTitle}>Explore the{'\n'}Emirates</ThemedText>
              <View style={styles.heroUnderline} />
              <ThemedText style={styles.heroSubtitle}>Discover cultural treasures</ThemedText>
            </View>
          </View>
        </View>
      }>

      <View style={styles.container}>
        {/* 1. Styled Category Scroller */}
        <View style={styles.pillScrollerWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.pillScrollerContent}
          >
            <Pressable style={[styles.pill, styles.pillActive]}>
              <MaterialCommunityIcons name="rocket-launch" size={16} color="#00d2ff" />
              <ThemedText style={styles.pillTextActive}>Featured</ThemedText>
            </Pressable>
            <Pressable style={styles.pill}>
              <MaterialCommunityIcons name="grid" size={16} color="#8b949e" />
              <ThemedText style={styles.pillText}>Categories</ThemedText>
            </Pressable>
            <Pressable style={styles.pill}>
              <MaterialCommunityIcons name="star-face" size={16} color="#8b949e" />
              <ThemedText style={styles.pillText}>Museum</ThemedText>
            </Pressable>
            <Pressable style={styles.pill}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#8b949e" />
              <ThemedText style={styles.pillText}>Nearby</ThemedText>
            </Pressable>
          </ScrollView>
        </View>

        {/* 2. Horizontal Gallery Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Parallax Scroll-view</ThemedText>
              <ThemedText style={styles.sectionTitle}>Featured Galleries</ThemedText>
            </View>
            <Pressable style={styles.seeAllButton}>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
              <MaterialCommunityIcons name="chevron-right" size={18} color="#00d2ff" />
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.horizontalGallery}
            decelerationRate="fast"
            snapToInterval={width * 0.5 + 12}
          >
            {HORIZONTAL_GALLERY.map((item) => (
              <Pressable key={item.id} style={styles.galleryCard}>
                <Image source={item.image} style={StyleSheet.absoluteFill} contentFit="cover" />
                <LinearGradient 
                  colors={['transparent', 'rgba(0,0,0,0.85)']} 
                  style={StyleSheet.absoluteFill}
                  locations={[0.5, 1]}
                />
                <View style={styles.cardOverlay}>
                  <View style={styles.cardInfo}>
                    <ThemedText style={styles.cardTitle} numberOfLines={2}>
                      {item.title}
                    </ThemedText>
                    <View style={styles.cardStats}>
                      <MaterialCommunityIcons name="thumb-up" size={12} color="#ffc107" />
                      <ThemedText style={styles.cardLikes}>{item.likes}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.cardAction}>
                    <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 3. Intelligence Feed Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Container</ThemedText>
              <ThemedText style={styles.sectionTitle}>Visual Intelligence</ThemedText>
            </View>
          </View>

          <View style={styles.listContainer}>
            {INTEL_LIST.map((item, index) => (
              <Pressable key={index} style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.listIcon}>
                    <MaterialCommunityIcons 
                      name={index % 3 === 0 ? "image-multiple" : index % 3 === 1 ? "brush" : "palette"} 
                      size={20} 
                      color="#00d2ff" 
                    />
                  </View>
                  <ThemedText style={styles.listLabel}>{item.label}</ThemedText>
                </View>
                <View style={styles.listRight}>
                  <ThemedText style={styles.listValue}>{item.value}</ThemedText>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#30363d" />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { 
    height: Math.min(280, height * 0.35), 
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 20,
    paddingHorizontal: 24,
  },
  heroThumbnail: { 
    width: 120, 
    height: 120, 
    borderRadius: 20, 
    borderWidth: 3, 
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroTextContent: { 
    flex: 1,
  },
  heroTitle: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: '#fff', 
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroUnderline: { 
    height: 3, 
    width: 80, 
    backgroundColor: '#00d2ff', 
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 2,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  
  container: { 
    flex: 1, 
    backgroundColor: '#0d1117', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    marginTop: -24,
    width: '100%',
    
  },
  
  pillScrollerWrapper: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  pillScrollerContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  pill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1c2128', 
    paddingHorizontal: 18, 
    paddingVertical: 12, 
    borderRadius: 24, 
    borderWidth: 1.5, 
    borderColor: '#30363d', 
    gap: 8,
  },
  pillActive: { 
    borderColor: '#00d2ff',
    backgroundColor: 'rgba(0, 210, 255, 0.08)',
  },
  pillText: { 
    color: '#8b949e', 
    fontSize: 14, 
    fontWeight: '600',
  },
  pillTextActive: { 
    color: '#00d2ff', 
    fontSize: 14, 
    fontWeight: '700',
  },

  section: {
    marginTop: 24,
  },
  sectionHeader: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20, 
    marginBottom: 16,
  },
  sectionLabel: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#00d2ff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#fff',
    letterSpacing: -0.5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#00d2ff',
    fontSize: 14,
    fontWeight: '600',
  },

  horizontalGallery: { 
    paddingHorizontal: 20, 
    gap: 12,
  },
  galleryCard: { 
    width: width * 0.5, 
    height: 260, 
    borderRadius: 16, 
    overflow: 'hidden', 
    backgroundColor: '#1c2128',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardInfo: { 
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardTitle: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '800',
    lineHeight: 20,
    marginBottom: 8,
  },
  cardStats: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6,
    backgroundColor: 'rgba(255, 193, 7, 0.2)', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  cardLikes: { 
    color: '#ffc107', 
    fontSize: 12, 
    fontWeight: '800',
  },
  cardAction: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 210, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.4)',
  },

  listContainer: { 
    paddingHorizontal: 20,
    backgroundColor: '#161b22',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    overflow: 'hidden',
  },
  listItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1, 
    borderBottomColor: '#21262d',
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 210, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.2)',
  },
  listLabel: { 
    color: '#c9d1d9', 
    fontSize: 15, 
    fontWeight: '600',
    flex: 1,
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listValue: { 
    color: '#00d2ff', 
    fontSize: 14, 
    fontWeight: '800',
    fontFamily: 'monospace',
  },

  bottomSpacer: {
    height: 40,
  },
});