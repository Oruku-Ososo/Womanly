import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';

export default function SettingsScreen() {
  const { userName, setUserName } = useStore((state) => ({
    userName: state.userName,
    setUserName: state.setUserName,
  }));
  const [nameInput, setNameInput] = useState(userName);

  const handleSave = () => {
    if (nameInput.trim().length === 0) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }
    setUserName(nameInput.trim());
    Alert.alert('Success', 'Settings saved!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={nameInput}
            onChangeText={setNameInput}
            placeholder="Enter your name"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Womanly Wellness</Text>
          <Text style={styles.infoText}>
            Your wellness journey starts here. Track your mood, symptoms, and gain insights into your health.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D87093',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE4E1',
    fontSize: 16,
    color: '#444',
  },
  saveButton: {
    backgroundColor: '#D87093',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D87093',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
