import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';
import { RADIUS, SPACING, COURSES, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import AppButton from '../components/AppButton';
import CourseDot from '../components/CourseDot';

// Home tab. A greeting, course coverage (how many dishes are in each
// course — a different question from Statistics' totals/averages, and
// one that makes an empty course visible at a glance), and two actions:
// navigate into the full menu, or jump straight to adding a new dish.
export default function DashboardScreen({ navigation }) {
  const { menuItems } = useMenu();
  const { colors, type, cardShadow } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, cardShadow), [colors, cardShadow]);

  const countsByCourse = COURSES.map((course) => ({
    course,
    count: menuItems.filter((item) => item.course === course).length,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Image
              source={require('../assets/logo-mark.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>PlateEasy</Text>
        </View>

        <Text style={[type.screenTitle, styles.greeting]}>Welcome back, Chef!</Text>
        <Text style={[type.bodyGrey, styles.subtitle]}>Here's a quick look at your menu.</Text>

        <View style={styles.statRow}>
          {countsByCourse.map(({ course, count }) => (
            <View style={styles.statCard} key={course}>
              <CourseDot course={course} size={9} style={styles.statDot} />
              <Text style={styles.statCount}>{count}</Text>
              <Text style={styles.statLabel}>{course}</Text>
            </View>
          ))}
        </View>

        <AppButton
          label="Manage Your Menu"
          variant="nav"
          onPress={() => navigation.navigate('Menu')}
        />
        <AppButton
          label="Add New Dish"
          variant="action"
          icon={<Text style={styles.plusIcon}>+</Text>}
          onPress={() => navigation.navigate('Menu', { screen: 'AddItem' })}
        />
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors, cardShadow) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xl,
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SPACING.lg,
    },
    logoBadge: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: colors.logoBadge,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 9,
    },
    logoImage: {
      width: 16,
      height: 11,
    },
    appName: {
      fontFamily: FONTS.headingSemiBold,
      fontSize: 16,
      color: colors.textPrimary,
    },
    greeting: {
      textAlign: 'center',
      marginBottom: 4,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: SPACING.xl,
    },
    statRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: SPACING.xl,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: RADIUS,
      paddingVertical: 16,
      paddingHorizontal: 8,
      alignItems: 'center',
      ...cardShadow,
    },
    statDot: {
      marginBottom: 6,
    },
    statCount: {
      fontFamily: FONTS.bodySemiBold,
      fontSize: 22,
      color: colors.textPrimary,
      marginBottom: 2,
    },
    statLabel: {
      fontFamily: FONTS.body,
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    plusIcon: {
      fontFamily: FONTS.bodyMedium,
      fontSize: 16,
      color: '#FFFFFF',
    },
  });
}
