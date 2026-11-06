import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RADIUS, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';

// One button component used everywhere the app needs an action or a
// navigation control, instead of every screen styling its own
// TouchableOpacity. That keeps height, radius and type consistent
// everywhere, and means both the colour discipline and the light/dark
// theming only have to be correct in one place.
//
// variant:
//   'action'      - Carrot Orange. Reserved for Add / Save only.
//   'nav'         - Cornflower Ocean. Reserved for navigation only.
//   'ghost'       - outlined, low-emphasis (e.g. Cancel).
//   'destructive' - red, for Delete — see the note on COLORS.destructive
//                   in constants/theme.js for why this isn't one of the
//                   five brand colours.
export default function AppButton({
  label,
  onPress,
  variant = 'action',
  icon = null,
  disabled = false,
  loading = false,
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isGhost ? colors.textSecondary : '#FFFFFF'} />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, isGhost && styles.ghostLabel]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 52,
      borderRadius: RADIUS,
      paddingHorizontal: 16,
      gap: 7,
      marginBottom: 10,
    },
    action: { backgroundColor: colors.orange },
    nav: { backgroundColor: colors.blue },
    destructive: { backgroundColor: colors.destructive },
    ghost: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    disabled: { opacity: 0.5 },
    label: {
      fontFamily: FONTS.bodyMedium,
      fontSize: 15,
      color: '#FFFFFF',
    },
    ghostLabel: { color: colors.textSecondary },
  });
}
