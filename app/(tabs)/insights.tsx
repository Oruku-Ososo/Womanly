import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';

export default function InsightsScreen() {
  const logs = useStore((state) => state.logs);

  const moodCounts = logs.reduce((acc, log) => {
    if (log.mood) {
      acc[log.mood] = (acc[log.mood] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const symptomCounts = logs.reduce((acc, log) => {
    log.symptoms.forEach((symptom) => {
      acc[symptom] = (acc[symptom] || 0) + 1;
    }, {} as Record<string, number>);
    return acc;
  }, {} as Record<string, number>);

  const sortedSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Insights</Text>

        {logs.length === 0 ? (
          <Text style={styles.placeholderText}>
            No data yet. Start tracking to see your wellness trends!
          </Text>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mood Distribution</Text>
              <View style={styles.card}>
                {Object.entries(moodCounts).map(([mood, count]) => (
                  <View key={mood} style={styles.insightRow}>
                    <Text style={styles.insightLabel}>{mood}</Text>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          { width: `${(count / logs.length) * 100}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.insightValue}>{count}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Symptoms</Text>
              <View style={styles.card}>
                {sortedSymptoms.slice(0, 5).map(([symptom, count]) => (
                  <View key={symptom} style={styles.insightRow}>
                    <Text style={styles.insightLabel}>{symptom}</Text>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          {
                            width: `${(count / logs.length) * 100}%`,
                            backgroundColor: '#FFB6C1'
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.insightValue}>{count}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D87093',
    marginBottom: 25,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  insightLabel: {
    width: 80,
    fontSize: 14,
    color: '#444',
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#D87093',
    borderRadius: 5,
  },
  insightValue: {
    width: 25,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});
