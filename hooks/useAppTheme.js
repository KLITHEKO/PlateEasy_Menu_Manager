import { useColorScheme } from 'react-native';
import { getColors, getType, getCardShadow } from '../constants/theme';

// Resolves the phone's system appearance to the app's light/dark palette.
// Every screen and shared component calls this instead of importing
// COLORS directly, so the whole app follows the system setting with no
// in-app toggle needed.
//
// useColorScheme() can return 'light', 'dark', or null (some
// devices/emulators report null before the first layout) — anything
// that isn't exactly 'dark' is treated as light.
export default function useAppTheme() {
  const systemScheme = useColorScheme();
  const scheme = systemScheme === 'dark' ? 'dark' : 'light';
  const colors = getColors(scheme);
  const type = getType(colors);
  const cardShadow = getCardShadow(colors);

  return { scheme, colors, type, cardShadow };
}
