import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';
import { RADIUS, SPACING, COURSES, FONTS, getCourseColor } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import CourseDot from '../components/CourseDot';

export default function StatisticsScreen() {
  const { menuItems } = useMenu();
  const { colors, type, cardShadow } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, cardShadow), [colors, cardShadow]);

  const totalItems = menuItems.length;

  // Work out the average price. If there are no items yet, dividing by
  // zero would give us NaN, so we guard against that and just show 0.
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  // Find the priciest and cheapest dish on the menu. reduce() walks the
  // list once each, keeping whichever item has the higher/lower price
  // seen so far — there's always at least one item here since we only
  // reach this part of the screen once totalItems is greater than 0.
  const mostExpensiveItem = menuItems.reduce(
    (highest, item) => (item.price > highest.price ? item : highest),
    menuItems[0]
  );
  const leastExpensiveItem = menuItems.reduce(
    (lowest, item) => (item.price < lowest.price ? item : lowest),
    menuItems[0]
  );

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

  const maxCount = Math.max(...statsByCourse.map((s) => s.count), 1);

  if (totalItems === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={type.screenTitle}>Menu Statistics</Text>
        <Text style={[type.bodyGrey, styles.emptyText]}>
          No menu items yet. Add a few dishes to see statistics here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[type.screenTitle, styles.title]}>Menu Statistics</Text>

      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={[type.label, styles.statCaption]}>Total Items</Text>
          <Text style={styles.statValue}>{totalItems}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[type.label, styles.statCaption]}>Avg Price</Text>
          <Text style={styles.statValue}>R{averagePrice.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[type.sectionHeading, styles.sectionHeading]}>Most / Least Expensive</Text>
        <View style={styles.minmaxRow}>
          <Text style={[type.bodyGrey, styles.minmaxLabel]}>Most expensive</Text>
          <Text style={styles.minmaxValue}>
            {mostExpensiveItem.name} — R{mostExpensiveItem.price.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.minmaxRow, styles.minmaxRowLast]}>
          <Text style={[type.bodyGrey, styles.minmaxLabel]}>Least expensive</Text>
          <Text style={styles.minmaxValue}>
            {leastExpensiveItem.name} — R{leastExpensiveItem.price.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[type.sectionHeading, styles.sectionHeading]}>Items Per Course</Text>
        {/* Each course's bar is sized relative to whichever course has the
            most items, so the busiest course always fills the full width
            and the others show proportionally — a quick visual read of
            which parts of the menu are biggest, not just a list of
            numbers. Each bar is filled in that course's own tonal colour
            (see CourseDot/getCourseColor) rather than a single shared
            colour, so the chart doubles as a key for the dots used
            elsewhere in the app. */}
        {statsByCourse.map(({ course, count, averagePrice: courseAverage }, index) => {
          const barWidth = `${(count / maxCount) * 100}%`;
          const isLast = index === statsByCourse.length - 1;
          return (
            <View style={[styles.courseRow, isLast && styles.courseRowLast]} key={course}>
              <View style={styles.courseRowTop}>
                <View style={styles.courseNameRow}>
                  <CourseDot course={course} style={styles.courseDot} />
                  <Text style={styles.courseName}>{course}</Text>
                </View>
                <Text style={styles.courseCount}>
                  {count} {count === 1 ? 'item' : 'items'}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: barWidth, backgroundColor: getCourseColor(colors, course) },
                  ]}
                />
              </View>
              <Text style={[type.label, styles.courseAverage]}>
                {count > 0 ? `avg R${courseAverage.toFixed(2)}` : 'No items yet'}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors, cardShadow) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: SPACING.lg,
    },
    title: {
      marginBottom: SPACING.lg,
    },
    emptyText: {
      marginTop: 40,
      textAlign: 'center',
    },
    statRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: SPACING.md,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: RADIUS,
      padding: 15,
      ...cardShadow,
    },
    statCaption: {
      marginBottom: 4,
    },
    statValue: {
      fontFamily: FONTS.bodySemiBold,
      fontSize: 22,
      color: colors.textPrimary,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS,
      padding: 15,
      marginBottom: SPACING.md,
      ...cardShadow,
    },
    sectionHeading: {
      marginBottom: 12,
    },
    minmaxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    minmaxRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    minmaxLabel: {
      fontSize: 14,
    },
    minmaxValue: {
      fontFamily: FONTS.bodyMedium,
      fontSize: 14,
      color: colors.textPrimary,
      marginLeft: 10,
      flexShrink: 1,
      textAlign: 'right',
    },
    courseRow: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    courseRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    courseRowTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    courseNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    courseDot: {
      marginRight: 6,
    },
    courseName: {
      fontFamily: FONTS.body,
      fontSize: 14,
      color: colors.textPrimary,
    },
    courseCount: {
      fontFamily: FONTS.bodyMedium,
      fontSize: 14,
      color: colors.textPrimary,
    },
    barTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 4,
    },
    courseAverage: {
      marginTop: 4,
    },
  });
}
