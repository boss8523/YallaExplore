import React, { useState, useRef } from 'react';
import { 
  StyleSheet, View, Keyboard, ScrollView, 
  KeyboardAvoidingView, Platform, TouchableOpacity, 
  StatusBar
} from 'react-native';
import { TextInput, IconButton, Surface, Avatar, Button, SegmentedButtons } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import SuggestionChip from '@/components/suggestion-chip';
import { useAi } from '@/app/context/ai-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'];
const POD_CATEGORIES = [
  { id: 'wheelchair', label: 'Physical', icon: 'wheelchair-accessibility' },
  { id: 'sensory', label: 'Sensory', icon: 'ear-hearing' },
  { id: 'visual', label: 'Visual', icon: 'eye-check' },
];

// Helper for the loading dots
const AnimatedDot = ({ delay }: { delay: number }) => (
  <Animated.View 
    entering={FadeIn.delay(delay).duration(400)} 
    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#00d2ff', marginHorizontal: 3 }} 
  />
);

export default function HomeScreen() {
  const router = useRouter();
  const { askAI, loading } = useAi();
  const scrollRef = useRef<ScrollView>(null);

  // --- UI & MODE STATE ---
  const [mode, setMode] = useState<'guided' | 'chat'>('guided');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // --- GUIDED FORM STATE ---
  const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
  const [budget, setBudget] = useState('moderate');
  const [travelDate, setTravelDate] = useState(new Date());
  const [travelParty, setTravelParty] = useState('alone');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState<string[]>([]);
  // Budget Options: 'Budget' | 'Moderate' | 'Luxury'
 const [duration, setDuration] = useState(3); // Default to 3 days

// Category Options: ['Nature', 'Culture', 'Adventure', 'Shopping']
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // --- CHAT CONVERSATION STATE ---
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);

  const handleChatSend = async (text: string) => {
    if (!text.trim() || loading || isAiThinking) return;

    const userText = text.trim();
    setQuery(''); 
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setIsAiThinking(true);

    try {
      const result = await askAI(userText);
      if (String(result.isJson) === 'true' && result.itineraryId) {
        router.push({
          pathname: '/results',
          params: { id: String(result.itineraryId) } 
        });
      } else if (result.textResponse) {
        setChatHistory(prev => [...prev, { role: 'ai', text: result.textResponse }]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "I encountered a sandstorm in my circuits. Mind trying again?" }]);
    } finally {
      setIsAiThinking(false);
    }
  };









const handleGuidedGenerate = async () => {
const prompt = `
    I want a ${duration}-day ${budget} itinerary for ${selectedEmirate}. 
    Start Date: ${travelDate.toDateString()}. 
    Travelers: ${travelParty}.
    Interests: ${selectedCategories.join(', ') || 'General'}.
    Accessibility: ${accessibilityNeeds.join(', ') || 'Standard'}.
    IMPORTANT: Provide exactly ${duration} daily plans.
  `;

  setIsAiThinking(true);
  const result = await askAI(prompt);
  console.log("AI Result:", result);
  setIsAiThinking(false)
  
  if (result && result.itineraryId) {
      router.push({
        pathname: '/results',
        params: { id: String(result.itineraryId) } 
      });
  }
};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <LinearGradient colors={['#0F2027', '#203A43', '#2c5364']} style={StyleSheet.absoluteFill} />
      
      <ScrollView 
        ref={scrollRef} 
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        <Animated.View entering={FadeIn.duration(800)} style={styles.heroContainer}>
          <Avatar.Icon size={60} icon="robot-happy" backgroundColor="rgba(0, 210, 255, 0.2)" color="#00d2ff" />
          <ThemedText style={styles.heroTitle}>YallaExplore</ThemedText>
          <ThemedText style={styles.heroSubtitle}>{mode === 'guided' ? "Guided Discovery" : "AI Concierge Mode"}</ThemedText>
        </Animated.View>

        {mode === 'guided' ? (
          <Animated.View entering={FadeInDown} style={styles.formContainer}>
            <ThemedText style={styles.label}>Destination</ThemedText>
            <View style={styles.chipRow}>
              {EMIRATES.map(e => (
                <SuggestionChip key={e} text={e} isSelected={selectedEmirate === e} onPress={() => setSelectedEmirate(e)} />
              ))}
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.label}>Date</ThemedText>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)} textColor="#fff" style={styles.outlineBtn}>
                  {travelDate.toLocaleDateString()}
                </Button>
                {showDatePicker && (
                  <DateTimePicker value={travelDate} mode="date" onChange={(e, d) => { setShowDatePicker(false); if(d) setTravelDate(d); }} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.label}>Travelers</ThemedText>
                <SegmentedButtons
                  value={travelParty}
                  onValueChange={setTravelParty}
                  buttons={[{ value: 'alone', label: 'Solo' }, { value: 'family', label: 'Family' }]}
                />
              </View>
            </View>
            {/* DURATION SELECTOR */}
<View style={{ marginTop: 10 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <ThemedText style={styles.label}>Trip Duration</ThemedText>
    <ThemedText style={{ color: '#00d2ff', fontWeight: 'bold', fontSize: 18 }}>
      {duration} {duration === 1 ? 'Day' : 'Days'}
    </ThemedText>
  </View>
  
  <View style={styles.durationControl}>
    <IconButton 
      icon="minus-circle-outline" 
      iconColor={duration > 1 ? "#00d2ff" : "#444"} 
      onPress={() => setDuration(Math.max(1, duration - 1))} 
    />
    
    {/* Progress Bar visual for the duration */}
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${(duration / 7) * 100}%` }]} />
    </View>

    <IconButton 
      icon="plus-circle-outline" 
      iconColor={duration < 7 ? "#00d2ff" : "#444"} 
      onPress={() => setDuration(Math.min(7, duration + 1))} 
    />
  </View>
</View>
            {/* 1. BUDGET SELECTION */}
<ThemedText style={styles.label}>Budget Experience</ThemedText>
<SegmentedButtons
  value={budget}
  onValueChange={setBudget}
  buttons={[
    { value: 'Budget', label: 'Value', icon: 'wallet-outline' },
    { value: 'Moderate', label: 'Balanced', icon: 'scale-balance' },
    { value: 'Luxury', label: 'Premium', icon: 'crown-outline' },
  ]}
  style={styles.segmented}
  theme={{ colors: { secondaryContainer: 'rgba(0, 210, 255, 0.2)', onSecondaryContainer: '#00d2ff' } }}
/>

{/* 2. CATEGORY SELECTION */}
<ThemedText style={styles.label}>Primary Interests</ThemedText>
<View style={styles.chipRow}>
  {['Nature', 'Culture', 'Adventure', 'Shopping'].map((cat) => (
    <TouchableOpacity
      key={cat}
      onPress={() => 
        setSelectedCategories(prev => 
          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
      }
      style={[
        styles.interestChip,
        selectedCategories.includes(cat) && styles.interestChipActive
      ]}
    >
      <MaterialCommunityIcons 
        name={cat === 'Nature' ? 'leaf' : cat === 'Culture' ? 'bank' : cat === 'Adventure' ? 'map-marker-distance' : 'cart'} 
        size={16} 
        color={selectedCategories.includes(cat) ? '#0F2027' : '#00d2ff'} 
      />
      <ThemedText style={[styles.interestText, selectedCategories.includes(cat) && { color: '#0F2027' }]}>
        {cat}
      </ThemedText>
    </TouchableOpacity>
  ))}
</View>

            <ThemedText style={styles.label}>Accessibility Needs</ThemedText>
            <View style={styles.podContainer}>
              {POD_CATEGORIES.map(cat => (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[styles.podCard, accessibilityNeeds.includes(cat.id) && styles.podActive]}
                  onPress={() => setAccessibilityNeeds(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id])}
                >
                  <MaterialCommunityIcons name={cat.icon as any} size={20} color="#fff" />
                  <ThemedText style={styles.podText}>{cat.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <Button mode="contained" onPress={handleGuidedGenerate} loading={isAiThinking} style={styles.mainBtn} textColor="#0F2027">
              Generate Best Plan
            </Button>
          </Animated.View>
        ) : (
          <View style={styles.chatArea}>
            {chatHistory.map((chat, i) => (
              <Animated.View key={i} entering={FadeInUp} style={[styles.bubble, chat.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                <ThemedText style={styles.bubbleText}>{chat.text}</ThemedText>
              </Animated.View>
            ))}

            {isAiThinking && (
              <View style={[styles.bubble, styles.aiBubble, { paddingVertical: 20 }]}>
                <View style={styles.loadingDots}>
                  <AnimatedDot delay={0} />
                  <AnimatedDot delay={200} />
                  <AnimatedDot delay={400} />
                </View>
              </View>
            )}

            {chatHistory.length === 0 && !isAiThinking && (
              <ThemedText style={styles.hintText}>I'm your UAE expert. Tell me what you're looking for!</ThemedText>
            )}
          </View>
        )}
      </ScrollView>

      {mode === 'chat' && (
        <View style={styles.inputBarContainer}>
          <Surface elevation={4} style={styles.chatInput}>
            <TextInput
              mode="flat"
              placeholder="Ask me anything..."
              placeholderTextColor="#888"
              value={query}
              onChangeText={setQuery}
              textColor="#fff"
              style={styles.textInput}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
            <IconButton icon="send" iconColor="#00d2ff" onPress={() => handleChatSend(query)} disabled={!query.trim() || isAiThinking} />
          </Surface>
        </View>
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => {
          setMode(mode === 'guided' ? 'chat' : 'guided');
        }}
      >
        <MaterialCommunityIcons name={mode === 'guided' ? "chat-processing" : "tune-variant"} size={30} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 150 },
  heroContainer: { alignItems: 'center', marginBottom: 30 },
  heroTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  heroSubtitle: { color: '#00d2ff', fontSize: 16 },
  formContainer: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 20, borderRadius: 25 },
  label: { color: '#00d2ff', marginTop: 15, marginBottom: 8, fontWeight: 'bold', fontSize: 13, textTransform: 'uppercase' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
  outlineBtn: { borderColor: 'rgba(255,255,255,0.3)', borderRadius: 10 },
  podContainer: { flexDirection: 'row', gap: 8, marginTop: 5 },
  podCard: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center' },
  podActive: { backgroundColor: '#00d2ff' },
  podText: { fontSize: 10, color: '#fff', marginTop: 4 },
  mainBtn: { marginTop: 30, backgroundColor: '#00d2ff', borderRadius: 12 },
  chatArea: { width: '100%' },
  hintText: { color: '#ccc', fontStyle: 'italic', textAlign: 'center', marginTop: 20 },
  bubble: { maxWidth: '85%', padding: 16, marginVertical: 8, borderRadius: 20 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#303134', borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.05)', borderLeftWidth: 3, borderLeftColor: '#00d2ff', borderBottomLeftRadius: 4 },
  bubbleText: { color: '#E8EAED', fontSize: 16, lineHeight: 24 },
  loadingDots: { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 },
  inputBarContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  chatInput: { flexDirection: 'row', backgroundColor: '#1E1F20', borderRadius: 32, paddingHorizontal: 8, borderWidth: 1, borderColor: '#444746', alignItems: 'center',position: 'relative', zIndex: 1,bottom: 80 },
  textInput: { flex: 1, backgroundColor: 'transparent', },
  fab: { position: 'absolute', top: 50, right: 20, backgroundColor: '#00d2ff', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  segmented: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 10,
  },
  interestChipActive: {
    backgroundColor: '#00d2ff',
    borderColor: '#00d2ff',
  },
  interestText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00d2ff',
  },
});