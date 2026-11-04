import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';

// The three courses the chef can pick from on the Add/Edit screens.
// We use this same list here so every course gets its own stat, even
// one with zero items in it.
const COURSES = ['Starter', 'Main Course', 'Dessert'];

export default function StatisticsScreen() {
  const { menuItems } = useMenu();

  const totalItems = menuItems.length;

  // Work out the average price. If there are no items yet, dividing by
  // zero would give us NaN, so we guard against that and just show 0.
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  // For each course, count how many menu items belong to it.
  const countsByCourse = COURSES.map((course) => ({
    course,
    count: menuItems.filter((item) => item.course === course).length,
  }));

  if (totalItems === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Menu Statistics</Text>
        <Text style={styles.emptyText}>
          No menu items yet. Add a few dishes to see statistics here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu Statistics</Text>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Total Menu Items</Text>
        <Text style={styles.statValue}>{totalItems}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Average Price</Text>
        <Text style={styles.statValue}>R{averagePrice.toFixed(2)}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Items Per Course</Text>
        {countsByCourse.map(({ course, count }) => (
          <View style={styles.courseRow} key={course}>
            <Text style={styles.courseName}>{course}</Text>
            <Text style={styles.courseCount}>{count}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9782D',
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4C3FA0',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#B8631F',
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  courseName: {
    fontSize: 15,
  },
  courseCount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
