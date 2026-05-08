import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';

const moods = ['😊', '😐', '😔', '😠', '😴'];
const symptoms = ['Headache', 'Cramps', 'Bloating', 'Fatigue', 'Acne', 'Nausea'];

export default function TrackerScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const addLog = useStore((state) => state.addLog);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSave = () => {
    if (!selectedMood && selectedSymptoms.length === 0) {
      Alert.alert('Empty Log', 'Please select a mood or at least one symptom.');
      return;
    }

    const log = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      symptoms: selectedSymptoms,
    };

    addLog(log);
    Alert.alert('Success', 'Your wellness log has been saved!');

    // Reset selection
    setSelectedMood(null);
    setSelectedSymptoms([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Track Your Day</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood</Text>
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.selectedMoodButton,
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={styles.moodEmoji}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          <View style={styles.symptomContainer}>
            {symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.symptomButton,
                  selectedSymptoms.includes(symptom) && styles.selectedSymptomButton,
                ]}
                onPress={() => toggleSymptom(symptom)}
              >
                <Text
                  style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom) && styles.selectedSymptomText,
                  ]}
                >
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Log</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  selectedMoodButton: {
    backgroundColor: '#FFB6C1',
    borderColor: '#FF69B4',
  },
  moodEmoji: {
    fontSize: 30,
  },
  symptomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  symptomButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  selectedSymptomButton: {
    backgroundColor: '#FF69B4',
    borderColor: '#FF69B4',
  },
  symptomText: {
    color: '#666',
  },
  selectedSymptomText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#D87093',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
