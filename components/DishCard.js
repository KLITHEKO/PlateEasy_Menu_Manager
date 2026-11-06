import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RADIUS, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import CourseDot from './CourseDot';

// One dish row, shared by the Menu list and Search results, so a single
// card definition serves both instead of two near-identical copies.
export default function DishCard({ item, onPress }) {
  const { colors, cardShadow } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, cardShadow), [colors, cardShadow]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.courseRow}>
        <CourseDot course={item.course} style={styles.dot} />
        <Text style={styles.course}>{item.course}</Text>
      </View>
    </TouchableOpacity>
  );
}

function createStyles(colors, cardShadow) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS,
      padding: 15,
      marginBottom: 10,
      ...cardShadow,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 10,
    },
    name: { flex: 1, fontFamily: FONTS.bodyMedium, fontSize: 16, color: colors.textPrimary },
    price: { fontFamily: FONTS.bodySemiBold, fontSize: 16, color: colors.textPrimary },
    description: { fontFamily: FONTS.body, fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    courseRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    dot: { marginRight: 6 },
    course: { fontFamily: FONTS.body, fontSize: 13, color: colors.textSecondary },
  });
}
