# PlateEasy

### Restaurant Menu Management

A mobile app for managing a restaurant's menu.

**Student Details**

Name: Kabelo Litheko
Student Number: ST10517550
Module: MAST5112
Assessment: Portfolio of Evidence (POE), Final POE

## Overview

PlateEasy is a React Native app built with Expo. It helps chefs manage a menu from a phone instead of a notebook or spreadsheet. A chef can add, edit, delete, search and review menu items directly in the app.

The app has four tabs: Home, Menu, Search and Statistics. Home shows a quick summary of the menu. Menu holds the full list of dishes, plus the forms for adding and editing one. Search finds dishes by name or course. Statistics shows totals, averages and a breakdown by course.

## Key Features

**Dashboard.** Shows how many dishes are in each course, with shortcuts to manage the menu or add a new dish.

**Menu Management (CRUD).** Add, view, edit and delete dishes. Each dish has a name, description, course and price. The list updates instantly, with no manual refresh.

**Search and Filtering.** Search by dish name and filter by course at the same time. Tapping a result opens it on the Edit screen.

**Menu Statistics.** Shows the total number of dishes, the average price, the most and least expensive dish, and a bar chart of dishes per course.

**Input Validation and User Feedback.** Every required field is checked before saving. Errors are specific to the field that failed. A confirmation message appears after every add, update or delete. An empty state message shows when there are no dishes yet.

**Adaptive Light and Dark Appearance.** The app follows the phone's system appearance. There is no in-app toggle. Colours, the splash screen and the status bar all adjust automatically.

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Expo | ~58.0.23 (SDK 58) | Build and development tooling |
| React | 19.3.0 | UI library |
| React Native | 0.88.1 | Mobile runtime |
| React Navigation (`native`, `native-stack`, `bottom-tabs`) | ^7.5.1 / ^7.21.0 / ^7.21.0 | Tab bar and stack navigation |
| React Native Screens | ~4.30.1 | Native screens used by React Navigation |
| React Native Safe Area Context | ~5.11.1 | Keeps content clear of notches and system bars |
| React Context (React core API) | — | Shares menu data across screens |
| Expo Font | ~58.0.11 | Loads local fonts at startup |
| Expo Splash Screen | ~58.0.13 | Controls the splash screen and its fade-out |
| Expo Status Bar | ~58.0.4 | Sets the status bar icon colour |
| Expo Vector Icons | ^15.1.1 | Tab bar icons |

A `tsconfig.json` and the `typescript` / `@types/react` devDependencies are in the project for editor type checking. The app's source files are plain JavaScript (`.js`), not TypeScript.

## Application Architecture

PlateEasy is built from small, reusable pieces instead of each screen styling its own buttons and cards.

**Shared state.** `context/MenuContext.js` holds the menu list and the add, update and delete functions in a React Context. Any screen can read or change the menu through `useMenu()`. The list lives in component state (`useState`), so it is not saved between app sessions. See Project Scope and Limitations.

**Navigation.** `App.js` sets up a bottom tab bar with four tabs: Home, Menu, Search and Statistics. The Menu tab has its own stack, so Add Item and Edit Item can be opened from the list and closed back to it. Screen colours follow the active light/dark theme.

**Centralised styling.** `constants/theme.js` holds all colour, type, spacing and radius values. Every screen reads the active theme through `useAppTheme()` (`hooks/useAppTheme.js`). Since `StyleSheet.create()` doesn't update on its own, each screen builds its styles in a `createStyles(colors)` function called with `useMemo`. This way, styles update when the theme changes.

**Reusable components.** `components/AppButton.js`, `components/ChipSelector.js`, `components/DishCard.js` and `components/CourseDot.js` are shared across screens:

- `AppButton`: one button component with four variants (action, nav, ghost, destructive), a 52px minimum touch target, and a loading state.
- `ChipSelector`: a row of selectable chips, used for the course picker on the forms and the course filter on Search.
- `DishCard`: one dish row, used on the Menu list and in Search results.
- `CourseDot`: a small coloured dot for a dish's course, used in `DishCard`, `ChipSelector`, the Home dashboard and the Statistics chart.

**Startup.** `App.js` keeps the splash screen visible while the local fonts load with `useFonts()`. Once loading finishes, the splash fades out and the app renders. This avoids a flash of the wrong font.

## Design System

The interface uses a small colour palette, two font families, and a fixed set of spacing and radius values, all defined in `constants/theme.js`. Each value has a light and dark version where needed, so the app follows the phone's system appearance.

### Colour Palette

| Colour | Light mode | Dark mode | Role |
|---|---|---|---|
| Black / White | Text `#000000`; background and surface `#FFFFFF` | Text `#F2F2F2`; background `#121212`; surface `#1E1E1E` | Text, background and card surfaces |
| Dim Grey | `#686E6E` | `#9BA3A3` | Secondary text and labels |
| Carrot Orange | `#F7993C` | `#F7993C` | Add / Save actions only |
| Cornflower Ocean | `#166990` | `#4FB3D9` | Navigation and selected states only |
| Destructive Red | `#C0392B` | `#C0392B` | Delete actions only |

Each brand colour has one job. Carrot Orange is only used for Add/Save. Cornflower Ocean is only used for navigation and selection. A small, purposeful palette reads as more deliberate than one colour reused for several things (freeCodeCamp, 2026).

**Course colours.** Each course has its own colour, shown as a small dot on dish cards, chips, the Home dashboard and the Statistics chart:

| Course | Light mode | Dark mode |
|---|---|---|
| Starter (Chartreuse) | `#809306` | `#DEF73B` |
| Main Course (Teal) | `#2DAAAA` | `#2DAAAA` |
| Dessert (Magenta) | `#8F156C` | `#D742AC` |

Some course colours change between light and dark mode. The hue stays the same; only the lightness changes, so the colour still meets WCAG 2.2 contrast guidelines (W3C, 2026) against its background. Starter's chartreuse, for example, is darkened for light mode and used at full brightness in dark mode.

### Typography

Typography uses two local fonts, loaded with Expo Font so the type looks the same on iOS and Android (Google, 2026a; Google, 2026c):

| Role | Font | Weight | Size |
|---|---|---|---|
| Screen titles | DM Sans | SemiBold | 24px |
| Section headings | DM Sans | SemiBold | 18px |
| Dish names | Source Sans 3 | Medium | 16px |
| Prices | Source Sans 3 | SemiBold | 16px |
| Body text | Source Sans 3 | Regular | 14px |
| Secondary body text | Source Sans 3 | Regular | 14px |
| Button labels | Source Sans 3 | Medium | 15px |
| Labels | Source Sans 3 | Regular | 12px |

A DM Sans Medium file is also loaded but not currently used.

### Spacing, Radius and Components

Cards and buttons use a 14px corner radius. Input fields use 12px. Spacing follows a fixed scale: 4, 8, 14, 18 and 22px. Card surfaces use a soft shadow on iOS and native elevation on Android.

### Accessibility Considerations

Colour contrast is checked against WCAG 2.2 (W3C, 2026), which is why some colours have a separate dark-mode value. Buttons have a 52px minimum touch target, based on Apple's Human Interface Guidelines (Apple Inc., 2026) and Google's Material Design 3 (Google, 2026b). The app follows the phone's system light/dark setting automatically, using React Native's `useColorScheme()` (Meta Platforms, Inc., 2026).

## Project Structure

```
PlateEasy_Menu_Manager/
├── App.js
├── app.json
├── index.js
├── package.json
├── tsconfig.json
├── assets/
│   ├── fonts/
│   │   ├── DMSans-Medium.ttf
│   │   ├── DMSans-SemiBold.ttf
│   │   ├── SourceSans3-Medium.ttf
│   │   ├── SourceSans3-Regular.ttf
│   │   └── SourceSans3-SemiBold.ttf
│   ├── icon.png, favicon.png, splash-icon.png, splash-logo.png, logo-mark.png
│   └── android-icon-background.png, android-icon-foreground.png, android-icon-monochrome.png
├── components/
│   ├── AppButton.js
│   ├── ChipSelector.js
│   ├── CourseDot.js
│   └── DishCard.js
├── constants/
│   └── theme.js
├── context/
│   └── MenuContext.js
├── hooks/
│   └── useAppTheme.js
└── screens/
    ├── DashboardScreen.js
    ├── HomeScreen.js
    ├── AddItemScreen.js
    ├── EditItemScreen.js
    ├── SearchScreen.js
    └── StatisticsScreen.js
```

**App.js** sets up navigation, loads the local fonts, and controls the splash screen.
**index.js** is the Expo entry point.
**constants/theme.js** holds the colour, type, spacing and shadow values.
**context/MenuContext.js** holds the menu list and its CRUD functions.
**hooks/useAppTheme.js** resolves the system colour scheme to the app's palette.
**components/** holds the four reusable components listed above.

**Screens:**

- `screens/DashboardScreen.js`: Home tab. Greeting, per-course dish counts, and shortcuts.
- `screens/HomeScreen.js`: Menu tab list. All dishes, the empty state, and the add button.
- `screens/AddItemScreen.js`: form to add a dish, with field validation.
- `screens/EditItemScreen.js`: form to edit a dish, same validation, plus delete.
- `screens/SearchScreen.js`: search by name and filter by course, results open on Edit.
- `screens/StatisticsScreen.js`: totals, averages, most/least expensive dish, bar chart.

## Installation and Setup

**Prerequisites:**

- Node.js and npm
- The Expo Go app for a physical device, or an iOS Simulator / Android Emulator

**Steps:**

```bash
npm install
npx expo start
```

With the server running, scan the QR code in Expo Go on a physical device, or press `i` for the iOS Simulator or `a` for the Android Emulator.

## Project Scope and Limitations

PlateEasy supports the full menu workflow: add, view, edit, delete, search, filter and review statistics. No login or setup is needed.

A few technical limitations come from the current implementation:

- **No persistent storage.** The menu lives in React state (`useState`), not device storage. It resets when the app restarts.
- **No backend or sync.** Each install has its own local menu. There is no server or account system.
- **Text-only dishes.** No photo or image field.
- **No automated tests.** The project has no unit or integration tests.
- **Touch feedback.** Buttons use `TouchableOpacity`'s opacity change, not Android's native ripple effect.
- **Fixed currency.** Prices use South African Rand (R) only.

## Development History

- 2026-11-04 — Kabelo Litheko — Added edit and delete functionality for menu items (Manage Menu Items).
- 2026-11-04 — Kabelo Litheko — Built out the Statistics screen: total menu items, average price, and items per course (Display Menu Statistics).
- 2026-11-04 — Kabelo Litheko — Built out the Search screen: search by dish name and filter by course (Search and Filter Menu Items).
- 2026-11-04 — Kabelo Litheko — Upgraded the project from Expo SDK 57 to Expo SDK 58 (React Native 0.88.1, React 19.3.0) to match the Expo Go app version.
- 2026-11-04 — Kabelo Litheko — Made search results tappable, opening the matching item directly on the Edit screen (Search and Filter Menu Items).
- 2026-11-04 — Kabelo Litheko — Added average price per course to the Statistics screen, alongside the overall total and average (Display Menu Statistics).
- 2026-11-04 — Kabelo Litheko — Added a Home tab with a dashboard showing total items, average price, and shortcuts into the Menu, Search and Statistics tabs.
- 2026-11-04 — Kabelo Litheko — Replaced the plain items-per-course list on the Statistics screen with a bar chart, so each course's share of the menu is visible at a glance.
- 2026-11-05 — Kabelo Litheko — Added a splash screen using the app's real logo mark instead of the default Expo splash.
- 2026-11-05 — Kabelo Litheko — Added a "Most / Least Expensive Dish" card to the Statistics screen.
- 2026-11-06 — Kabelo Litheko — Finalised the app's colour palette and typography as a documented design system in constants/theme.js, informed by UI colour theory, the 60-30-10 distribution guideline (freeCodeCamp, 2026), WCAG 2.2 contrast guidance (W3C, 2026), and platform touch-target conventions from Apple's Human Interface Guidelines (Apple Inc., 2026) and Google's Material Design 3 (Google, 2026b).
- 2026-11-06 — Kabelo Litheko — Loaded DM Sans and Source Sans 3 locally via Expo Font for consistent typography across iOS and Android (Google, 2026a; Google, 2026c), replacing the operating system's default font.
- 2026-11-06 — Kabelo Litheko — Rebuilt the Home screen to show item counts per course instead of duplicating the totals already shown on Statistics, and replaced the Search/Stats shortcut buttons with a single "Add New Dish" shortcut that wasn't available anywhere else in the app.
- 2026-11-06 — Kabelo Litheko — Replaced the Picker-based course selector on the Add, Edit and Search screens with a reusable ChipSelector component, and removed the now-unused React Native Picker dependency.
- 2026-11-06 — Kabelo Litheko — Extracted AppButton and DishCard as reusable components used across the Home, Menu and Search screens, reducing duplicated button and list-row styling code.
- 2026-11-06 — Kabelo Litheko — Added light/dark mode, following the phone's system appearance automatically via React Native's useColorScheme() (Meta Platforms, Inc., 2026) — no in-app toggle. Added a dark palette to constants/theme.js and a shared useAppTheme hook, and converted every screen and shared component from static to theme-reactive styling.
- 2026-11-06 — Kabelo Litheko — Added a per-course colour (a tonal grey, not a new hue) shown as a small dot on dish cards, the course/filter chips, the Home course-coverage cards, and the Statistics bar chart, so the three courses are distinguishable at a glance in both light and dark mode.
- 2026-11-06 — Kabelo Litheko — Centred the Home screen's greeting and subtitle, and the logo row above them.
- 2026-11-06 — Kabelo Litheko — Added a fade transition when the splash screen hides, instead of it disappearing instantly.
- 2026-11-06 — Kabelo Litheko — Replaced the tonal-grey per-course colour with three independent, contrast-checked hues — Chartreuse for Starter, Teal for Main Course and Magenta for Dessert — substituting a separate light-mode or dark-mode value wherever the chosen hex fell below a readable contrast ratio against that mode's card surface (WCAG 2.2; W3C, 2026).

## References

Apple Inc., 2026. Human Interface Guidelines. Available at: https://developer.apple.com/design/human-interface-guidelines [Accessed 6 November 2026].

Expo, 2026. Expo Documentation. Available at: https://docs.expo.dev [Accessed 5 September 2026].

freeCodeCamp, 2026. What is the 60-30-10 Rule in Design? And How to Use it in Your Projects. Available at: https://www.freecodecamp.org/news/the-60-30-10-rule-in-design/ [Accessed 6 November 2026].

Google, 2026a. DM Sans. Google Fonts. Available at: https://fonts.google.com/specimen/DM+Sans [Accessed 6 November 2026].

Google, 2026b. Material Design 3. Available at: https://m3.material.io/ [Accessed 6 November 2026].

Google, 2026c. Source Sans 3. Google Fonts. Available at: https://fonts.google.com/specimen/Source+Sans+3 [Accessed 6 November 2026].

Meta Platforms, Inc., 2026. React Native Documentation. Available at: https://reactnative.dev/docs/getting-started [Accessed 5 September 2026].

React Navigation, 2026. React Navigation Documentation. Available at: https://reactnavigation.org/docs/getting-started [Accessed 5 September 2026].

React Native Community, 2026. React Native Safe Area Context. Available at: https://github.com/th3rdwave/react-native-safe-area-context [Accessed 7 September 2026].

W3C, 2026. Web Content Accessibility Guidelines (WCAG) 2.2. Available at: https://www.w3.org/TR/WCAG22/ [Accessed 6 November 2026].
