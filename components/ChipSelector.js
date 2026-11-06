import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RADIUS, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import CourseDot from './CourseDot';

// A row of selectable chips. Used for the course picker on the Add/Edit
// forms AND the course filter row on Search — one component instead of
// two hand-rolled pickers, so the "selected" state (solid Cornflower
// Ocean, per the brief's "blue for navigation and selected elements")
// only has to be styled correctly once.
//
// Each option is { label, value, course? }. When `course` is one of the
// three course names, the chip gets a small tonal dot in that course's
// colour (see CourseDot) so the courses are distinguishable at a glance,
// not just by reading the label. Options with no `course` (e.g. an
// "All" filter chip) get no dot.
export default function ChipSelector({ options, value, onChange }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.8}
          >
            {option.course && <CourseDot course={option.course} size={7} style={styles.dot} />}
            <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    row: { flexDirection: 'row', gap: 8 },
    chip: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 11,
      paddingHorizontal: 4,
      borderRadius: RADIUS,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    chipSelected: { backgroundColor: colors.blue, borderColor: colors.blue },
    dot: { marginRight: 6 },
    label: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: colors.textSecondary },
    labelSelected: { color: '#FFFFFF' },
  });
}
