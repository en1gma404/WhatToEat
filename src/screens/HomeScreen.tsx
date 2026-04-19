
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

const restaurants = [
  { name: 'Firuze', cuisine: 'Азербайджанская кухня' },
  { name: 'Mugam Club', cuisine: 'Национальная кухня' },
  { name: 'Chinar', cuisine: 'Европейская кухня' },
  { name: 'Paul Bakery', cuisine: 'Французская кухня' },
  { name: 'Sumakh', cuisine: 'Азербайджанская кухня' },
  { name: 'Nargiz', cuisine: 'Домашняя кухня' },
];

export default function HomeScreen() {
  const [result, setResult] = useState<{ name: string; cuisine: string } | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setResult(random);
      setSpinning(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yemek Baku</Text>
      <Text style={styles.subtitle}>Не знаешь что поесть?</Text>

      <TouchableOpacity style={styles.button} onPress={spin} disabled={spinning}>
        <Text style={styles.buttonText}>
          {spinning ? 'Выбираю...' : 'Выбрать за меня'}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardName}>{result.name}</Text>
          <Text style={styles.cardCuisine}>{result.cuisine}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#FF5A36',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    marginTop: 40,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    width: '100%',
  },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cardCuisine: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
});