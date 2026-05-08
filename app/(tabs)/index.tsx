import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';

export default function HomeScreen() {
  const logs = useStore((state) => state.logs);
  const logCount = logs.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Beautiful!</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Tip</Text>
          <Text style={styles.cardText}>
            Stay hydrated! Drinking enough water is essential for maintaining energy levels and supporting your overall wellness.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Summary</Text>
          <Text style={styles.cardText}>
            {logCount === 0
              ? "You haven't logged any data yet. Start tracking today!"
              : `You've logged ${logCount} day${logCount === 1 ? '' : 's'}. Keep it up!`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D87093',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D87093',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
