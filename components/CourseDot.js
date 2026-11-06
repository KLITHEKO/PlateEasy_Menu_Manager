import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getCourseColor } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';

// A small solid dot in a course's tonal colour — the whole of "colour
// per course" lives in this one component, so DishCard, ChipSelector,
// the Home stat cards and the Statistics bars all agree on the same
// three tones instead of each picking their own.
export default function CourseDot({ course, size = 8, style }) {
  const { colors } = useAppTheme();
  const dotColor = getCourseColor(colors, course);

  return (
    <View
      style={[
        styles.dot,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: dotColor },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    flexShrink: 0,
  },
});
