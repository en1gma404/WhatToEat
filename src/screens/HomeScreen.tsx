import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

const restaurants = [
  { name: 'Firuze', cuisine: 'Azərbaycan', emoji: '🍖', color: '#FF6B35' },
  { name: 'Mugam Club', cuisine: 'Milli', emoji: '🎭', color: '#C0392B' },
  { name: 'Chinar', cuisine: 'Avropa', emoji: '🥗', color: '#27AE60' },
  { name: 'Paul Bakery', cuisine: 'Fransız', emoji: '🥐', color: '#E67E22' },
  { name: 'Sumakh', cuisine: 'Azərbaycan', emoji: '🍲', color: '#8E44AD' },
  { name: 'Nargiz', cuisine: 'Ev yemeyi', emoji: '🏠', color: '#2980B9' },
  { name: 'Sahil', cuisine: 'Dəniz', emoji: '🦞', color: '#16A085' },
  { name: 'Baku Kebab', cuisine: 'Kabab', emoji: '🍢', color: '#D35400' },
];

export default function HomeScreen() {
  const [result, setResult] = useState<typeof restaurants[0] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    fadeAnim.setValue(0);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => rotateAnim.setValue(0));

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/spin.mp3')
      );
      await sound.playAsync();
    } catch (e) {}

    setTimeout(() => {
      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setResult(random);
      setSpinning(false);
      Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 900);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.tagline}>BAKI · YEMƏK</Text>
        <Text style={styles.title}>NƏ YEYƏK?</Text>
        <Text style={styles.subtitle}>Qərar verə bilmirsən?{'\n'}Biz seçirik.</Text>
      </View>

      <Animated.View style={[styles.buttonWrap, { transform: [{ scale: spinning ? scaleAnim : pulseAnim }] }]}>
        <TouchableOpacity style={styles.button} onPress={spin} activeOpacity={0.85}>
          <Animated.Text style={[styles.buttonEmoji, { transform: [{ rotate }] }]}>
            {spinning ? '⟳' : '🎲'}
          </Animated.Text>
          <Text style={styles.buttonText}>
            {spinning ? 'Seçilir...' : 'Seç mənim üçün'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {result && (
        <Animated.View style={[
          styles.card,
          { backgroundColor: result.color, opacity: fadeAnim, transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] }
        ]}>
          <Text style={styles.cardEmoji}>{result.emoji}</Text>
          <Text style={styles.cardName}>{result.name}</Text>
          <Text style={styles.cardCuisine}>{result.cuisine} mətbəxi</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>Bu gün buraya get</Text>
          </View>
        </Animated.View>
      )}

      {!result && !spinning && (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Bakıda {restaurants.length} restoran sənin üçün hazırdır</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 52,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 6,
    color: '#FF6B35',
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  buttonWrap: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonEmoji: {
    fontSize: 22,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  card: {
    width: '100%',
    padding: 32,
    borderRadius: 28,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  cardName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  cardCuisine: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardBadge: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    marginTop: 8,
  },
  hintText: {
    color: '#333',
    fontSize: 13,
    textAlign: 'center',
  },
});