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

  // For each course, work out how many items belong to it and the
  // average price of just those items. Same zero-item guard as above,
  // so a course with nothing in it yet shows a dash instead of NaN.
  const statsByCourse = COURSES.map((course) => {
    const itemsInCourse = menuItems.filter((item) => item.course === course);
    const courseCount = itemsInCourse.length;
    const courseTotal = itemsInCourse.reduce((sum, item) => sum + item.price, 0);
    const courseAverage = courseCount > 0 ? courseTotal / courseCount : 0;
    return { course, count: courseCount, averagePrice: courseAverage };
  });

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
        <Text style={styles.statLabel}>Items and Average Price Per Course</Text>
        {/* Each course's bar is sized relative to whichever course has the
            most items, so the busiest course always fills the full width
            and the others show proportionally — a quick visual read of
            which parts of the menu are biggest, not just a list of numbers. */}
        {statsByCourse.map(({ course, count, averagePrice: courseAverage }) => {
          const maxCount = Math.max(...statsByCourse.map((s) => s.count), 1);
          const barWidth = `${(count / maxCount) * 100}%`;
          return (
            <View style={styles.courseRow} key={course}>
              <View style={styles.courseRowTop}>
                <Text style={styles.courseName}>{course}</Text>
                <Text style={styles.courseCount}>
                  {count} {count === 1 ? 'item' : 'items'}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: barWidth }]} />
              </View>
              <Text style={styles.courseAverage}>
                {count > 0 ? `avg R${courseAverage.toFixed(2)}` : 'No items yet'}
              </Text>
            </View>
          );
        })}
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  courseRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  courseName: {
    fontSize: 15,
  },
  courseCount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f0eee8',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#D9782D',
  },
  courseAverage: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
