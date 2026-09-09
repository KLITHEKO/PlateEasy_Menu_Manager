import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Search will be built in the Final POE. For now this just holds the tab's
// place so the navigation matches the Part 1 wireframes.
export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Search is coming in the Final POE.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: '#666',
  },
});
