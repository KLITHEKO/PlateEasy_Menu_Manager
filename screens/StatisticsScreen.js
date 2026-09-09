import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Statistics will be built in the Final POE.
export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Statistics are coming in the Final POE.</Text>
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
