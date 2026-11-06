// A single source of truth for colour, type, spacing and radius, so every
// screen pulls from the same values instead of each one hard-coding its
// own hex codes and sizes. This is the agreed design spec: a strict
// 5-colour brand palette where each colour has exactly one job, a fixed
// type scale built on DM Sans (headings) and Source Sans 3 (everything
// else), and light/dark variants of each so the app follows the phone's
// system appearance.

export const RADIUS = 14;
export const RADIUS_INPUT = 12;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 22,
};

// Local font family names — these keys must match exactly what App.js
// registers with useFonts(). No fontWeight is ever combined with these:
// each file IS a specific weight, so setting fontWeight separately can
// make RN fight the font file instead of using it.
export const FONTS = {
  headingSemiBold: 'DMSans-SemiBold', // 600 — screen titles & section headings only
  headingMedium: 'DMSans-Medium', // 500 — available, not used by the current scale
  body: 'SourceSans3-Regular', // 400
  bodyMedium: 'SourceSans3-Medium', // 500
  bodySemiBold: 'SourceSans3-SemiBold', // 600
};

// The three courses a dish can belong to, in display order. One source
// of truth used by the course selector, the search filter, the Home
// course-coverage cards and the Statistics screen, instead of five
// screens each keeping their own copy of this list.
export const COURSES = ['Starter', 'Main Course', 'Dessert'];

// ---- Palettes -------------------------------------------------------
//
// Orange and the destructive red are unchanged between themes: both are
// always used as a solid button fill with white text on top, so their
// contrast never depends on the page background.
//
// Everything else that sits directly against the page background
// (background/surface itself, primary and secondary text, borders,
// placeholders, and blue when it's used as on-background text/icon
// colour rather than a filled chip) needs a dark-mode-specific value to
// keep WCAG-level contrast against a near-black background instead of
// a white one.
//
// Course colours: three independent hues (not borrowed from the brand's
// orange/blue), one per course — Starter Chartreuse, Main Course Teal,
// Dessert Magenta. Each one's light/dark pair keeps the same hue in
// both modes and only adjusts lightness/saturation where the literal
// value would fail contrast against that mode's background/surface:
//   - Starter: the bright chartreuse (#DEF73B) has a relative luminance
//     of ~0.82 — almost as light as white (1.0) and the light palette's
//     own `border` (#EDEDED, ~0.85) — so on a white card or grey track
//     it would barely register. It's used as-is in dark mode (contrast
//     ~14:1 against #121212) and darkened/more-saturated for light mode
//     (same ~68° hue, HSL 68°/92%/30% instead of 68°/92%/60%) to clear a
//     readable ~3:1 against white.
//   - Main Course: the teal (#2DAAAA) clears an acceptable contrast
//     against both the white/near-white light background and the
//     near-black dark background as a single literal value, the same
//     "one value, both themes" treatment already used for `orange`.
//   - Dessert: the magenta (#8F156C) reads clearly on a light background
//     (~8:1) but is too dark itself (relative luminance ~0.07) to stand
//     out from the dark surface (#1E1E1E, ~0.013) — so it's used as-is
//     in light mode and lightened for dark mode (same ~317° hue, HSL
//     317°/65%/55% instead of 317°/74%/32%) to clear a readable ~4:1
//     against the dark surface.
const LIGHT = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#686E6E',
  orange: '#F7993C',
  blue: '#166990',
  border: '#EDEDED',
  placeholder: '#B9B9B9',
  destructive: '#C0392B',
  // Black would vanish on a near-black dark background, so the logo
  // badge borrows the brand's orange accent in dark mode instead (see
  // DARK below) — a deliberate, isolated exception for a brand mark,
  // not a functional control.
  logoBadge: '#000000',
  shadowColor: '#000000',
  shadowOpacity: 0.055,
  courseColors: {
    Starter: '#809306', // Chartreuse, darkened for contrast on a white/light background
    'Main Course': '#2DAAAA', // Teal
    Dessert: '#8F156C', // Magenta
  },
};

const DARK = {
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#F2F2F2',
  textSecondary: '#9BA3A3',
  orange: '#F7993C',
  // Lightened from the brand's #166990 so it still clears WCAG AA
  // contrast when used as on-background text/icon colour (the tab bar,
  // the "Clear Search" link) rather than as a filled chip.
  blue: '#4FB3D9',
  border: '#2C2C2C',
  placeholder: '#6E6E6E',
  destructive: '#C0392B',
  logoBadge: '#F7993C',
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  courseColors: {
    Starter: '#DEF73B', // Chartreuse
    'Main Course': '#2DAAAA', // Teal
    Dessert: '#D742AC', // Magenta, lightened for contrast on a dark background
  },
};

// Resolves React Native's useColorScheme() ('light' | 'dark' | null) to
// one of the two palettes above. Anything other than exactly 'dark'
// (including null, which some devices/emulators report) falls back to
// light.
export function getColors(scheme) {
  return scheme === 'dark' ? DARK : LIGHT;
}

export function getCourseColor(colors, course) {
  return colors.courseColors[course] || colors.textSecondary;
}

// The exact type scale from the typography brief. Everything in the app
// pulls a role from here rather than inventing a one-off size. Built
// from the active palette's colours so text stays readable in both
// themes.
export function getType(colors) {
  return {
    screenTitle: { fontFamily: FONTS.headingSemiBold, fontSize: 24, color: colors.textPrimary },
    sectionHeading: { fontFamily: FONTS.headingSemiBold, fontSize: 18, color: colors.textPrimary },
    dishName: { fontFamily: FONTS.bodyMedium, fontSize: 16, color: colors.textPrimary },
    body: { fontFamily: FONTS.body, fontSize: 14, color: colors.textPrimary },
    bodyGrey: { fontFamily: FONTS.body, fontSize: 14, color: colors.textSecondary },
    price: { fontFamily: FONTS.bodySemiBold, fontSize: 16, color: colors.textPrimary },
    buttonLabel: { fontFamily: FONTS.bodyMedium, fontSize: 15, color: '#FFFFFF' },
    label: { fontFamily: FONTS.body, fontSize: 12, color: colors.textSecondary },
  };
}

// iOS reads the shadow* properties; Android ignores them completely and
// only respects elevation. A dark background needs a much stronger
// shadowOpacity to read at all, and even then it's subtle — the real
// separation between a dark card and a dark background comes from
// surface being lighter than background (see the palettes above), not
// from the shadow.
export function getCardShadow(colors) {
  return {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors.shadowOpacity,
    shadowRadius: 10,
    elevation: 3,
  };
}
