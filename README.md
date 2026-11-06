# PlateEasy (Menu Manager)

## Student Details

Name: Kabelo Litheko
Student Number: ST10517550
Module: MAST5112
Assessment: Portfolio of Evidence (POE), Final POE

## Overview

PlateEasy is a mobile application built using React Native (Meta Platforms, Inc., 2026) and the Expo framework (Expo, 2026), developed for the Chef's Menu Manager brief. This version of the app (the Final POE) lets a chef add, edit and delete menu items; view the full menu with no manual refresh needed; search and filter the menu by dish name and course; and view statistics about the menu (totals, averages, the most and least expensive dish, and a per-course breakdown), with input validation and clear feedback throughout.

## Features

PlateEasy supports the full menu management workflow a chef needs, from building the menu to reviewing it. The interface is built from React Native components (Meta Platforms, Inc., 2026), with a clear title, readable text, consistent spacing and alignment, and a layout based on the Part 1 wireframes.

Adding a dish captures its name, description, course and price, each through an input suited to that type of data. Every dish added appears in the list immediately, with no need to manually refresh the screen.

Any existing dish can be opened from the Menu tab and edited with the same validation as adding a new one, or deleted after a confirmation prompt, so a mistake can be corrected without starting over.

The Search tab finds dishes by name and narrows them down by course, and tapping a result opens it directly on the Edit screen.

The Statistics tab shows the total number of items, the average price across the whole menu, the most and least expensive dish, and a bar chart of how many items — and their average price — belong to each course.

Required fields are validated before a dish is saved, with a specific error message for whatever field is wrong, a confirmation message after every add, update or delete, and a message on the Home screen when the menu is empty.

Navigation between the Home, Menu, Search and Statistics tabs, and the Add Item and Edit Item screens nested within the Menu tab, uses React Navigation (React Navigation, 2026).

## Technology Stack

Expo SDK 58 (Expo, 2026)
React 19.3.0 and React Native 0.88.1 (Meta Platforms, Inc., 2026)
React Navigation, used for the tab bar and stack navigation (React Navigation, 2026)
React Native Safe Area Context, used to correctly handle device safe areas (React Native Community, 2026)
Expo Vector Icons, used for the tab bar icons (Expo, 2026)
Expo Font, used to load DM Sans and Source Sans 3 locally for consistent cross-platform typography (Expo, 2026)

## Design System

The app's colour palette, typography, spacing and corner-radius values are centralised in `constants/theme.js` as a single source of truth, rather than each screen hard-coding its own values. The palette is deliberately restricted to five colours — Black, Carrot Orange, Dim Grey, White and Cornflower Ocean — each limited to exactly one functional role (for example, Carrot Orange is used only for Add/Save actions, and Cornflower Ocean only for navigation and selected states), following the general UI colour theory principle that a small, purposeful palette with a clear 60-30-10 distribution across background, secondary and accent colours reads as more deliberate and readable than one colour used inconsistently for several different purposes (freeCodeCamp, 2026).

Typography uses DM Sans for screen titles and section headings and Source Sans 3 for all other text (dish names, prices, buttons and labels), both loaded as local font files via Expo Font rather than relying on the operating system's default typeface, so the brand typography is identical on iOS and Android (Google, 2026a; Google, 2026c).

Touch target sizing (a 52px minimum button height), spacing and the use of shadow versus Android elevation for card surfaces were checked against the touch-target and layout guidance in Apple's Human Interface Guidelines (Apple Inc., 2026) and Google's Material Design 3 (Google, 2026b), and colour contrast between text and its background was checked against the Web Content Accessibility Guidelines (W3C, 2026) minimum contrast ratios.

## Project Structure

App.js sets up navigation (React Navigation, 2026), including the tab bar and the stack navigator used between the Home and Add Item screens, and loads the app's local fonts before rendering any screen.
index.js is the Expo entry point.
constants/theme.js holds the shared colour palette, type scale, spacing and shadow tokens used by every screen.
components/AppButton.js, components/ChipSelector.js and components/DishCard.js are reusable UI components shared across multiple screens, instead of each screen styling its own button, course selector or list row.
context/MenuContext.js holds the shared menu item state using React Context (Meta Platforms, Inc., 2026), so every screen can read and update it.
screens/DashboardScreen.js is the Home tab: a greeting, item counts per course, and shortcuts into the Menu and Add Item screens.
screens/HomeScreen.js displays the list of menu items, the empty state message, and the button used to add a new item.
screens/AddItemScreen.js and screens/EditItemScreen.js contain the forms used to capture or update a menu item, including validation and success feedback; EditItemScreen.js also handles deleting the item.
screens/SearchScreen.js lets the chef search the menu by dish name and filter it by course, with results that open directly on the Edit screen.
screens/StatisticsScreen.js shows total items, average price, the most and least expensive dish, and a bar chart of items per course with each course's own average price.

## How to Run

Install dependencies with npm install.
Start the development server with npx expo start (Expo, 2026).
Open the Expo Go app on a physical device and scan the QR code shown in the terminal, or press i for the iOS simulator or a for the Android emulator.

## Change Log

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
