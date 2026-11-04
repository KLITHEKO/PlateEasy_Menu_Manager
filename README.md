# PlateEasy (Menu Manager)

## Student Details

Name: Kabelo Litheko
Student Number: ST10517550
Module: MAST5112
Assessment: Portfolio of Evidence (POE), Part 2

## Overview

PlateEasy is a mobile application built using React Native (Meta Platforms, Inc., 2026) and the Expo framework (Expo, 2026), developed for the Chef's Menu Manager brief. This version of the app (Part 2) allows a chef to add new menu items and view all items that have been added, with input validation and clear feedback throughout. Editing, deleting, searching and statistics are out of scope for this version and are planned for the Final POE.

## Features

Build the user interface: a clear application title, appropriate React Native components (Meta Platforms, Inc., 2026), readable text, consistent spacing and alignment, and a simple layout based on the Part 1 wireframes.

Capture menu information: dish name, description, course and price are each captured using an appropriate input component from the React Native core component library (Meta Platforms, Inc., 2026).

Display menu items: multiple menu items can be added, all added items are displayed, and the list updates automatically whenever a new item is added, with no manual refresh needed.

Improve the user experience: validation is performed on all required fields, appropriate error messages are shown when validation fails, a confirmation message is shown once an item has been added successfully, and a message is shown when no menu items have been added yet.

Navigation between the Home screen and the Add Item screen, as well as the bottom tab bar, is handled using React Navigation (React Navigation, 2026).

## Technology Stack

Expo SDK 58 (Expo, 2026)
React 19.3.0 and React Native 0.88.1 (Meta Platforms, Inc., 2026)
React Navigation, used for the tab bar and stack navigation (React Navigation, 2026)
React Native Picker, used for the course selection field (React Native Community, 2026)
React Native Safe Area Context, used to correctly handle device safe areas (React Native Community, 2026)
Expo Vector Icons, used for the tab bar icons (Expo, 2026)

## Project Structure

App.js sets up navigation (React Navigation, 2026), including the tab bar and the stack navigator used between the Home and Add Item screens.
index.js is the Expo entry point.
context/MenuContext.js holds the shared menu item state using React Context (Meta Platforms, Inc., 2026), so the Home and Add Item screens can both read and update it.
screens/HomeScreen.js displays the list of menu items, the empty state message, and the button used to add a new item.
screens/AddItemScreen.js contains the form used to capture a new menu item, including validation and success feedback.
screens/SearchScreen.js and screens/StatisticsScreen.js are placeholder screens reserved for the Final POE.

## How to Run

Install dependencies with npm install.
Start the development server with npx expo start (Expo, 2026).
Open the Expo Go app on a physical device and scan the QR code shown in the terminal, or press i for the iOS simulator or a for the Android emulator.

## Scope and Limitations

This version of the app (Part 2 of the POE) covers four requirement areas.

Build the user interface: the app is built from appropriate React Native components (Meta Platforms, Inc., 2026), with a clear application title, readable text, consistent spacing and alignment, and a simple layout based on the Part 1 wireframes.

Capture menu information: the chef can enter a dish name, a description, a course, and a price, using an input component suited to each type of data.

Display menu items: the chef can add multiple menu items, view all items that have been added, and the displayed list updates automatically whenever a new item is added, without needing to manually refresh the screen.

Improve the user experience: required fields are validated before an item is saved, specific error messages are shown for each field that fails validation (including a check that the price is a valid number greater than zero), a confirmation message is shown once an item has been added successfully, and a message is shown on the Home screen when no menu items have been added yet.

The following are intentionally out of scope for this version and are reserved for the Final POE: editing an existing menu item, deleting a menu item, searching or filtering the menu, and viewing statistics about the menu. The Search and Statistics tabs are visible in the app to match the navigation structure from the Part 1 wireframes, but currently only display a placeholder message stating that the feature is coming in the Final POE.

## Change Log

- 2026-11-04 — Kabelo Litheko — Added edit and delete functionality for menu items (Manage Menu Items).
- 2026-11-04 — Kabelo Litheko — Built out the Statistics screen: total menu items, average price, and items per course (Display Menu Statistics).
- 2026-11-04 — Kabelo Litheko — Built out the Search screen: search by dish name and filter by course (Search and Filter Menu Items).
- 2026-11-04 — Kabelo Litheko — Upgraded the project from Expo SDK 57 to Expo SDK 58 (React Native 0.88.1, React 19.3.0) to match the Expo Go app version.
- 2026-11-04 — Kabelo Litheko — Made search results tappable, opening the matching item directly on the Edit screen (Search and Filter Menu Items).
- 2026-11-04 — Kabelo Litheko — Added average price per course to the Statistics screen, alongside the overall total and average (Display Menu Statistics).
- 2026-11-04 — Kabelo Litheko — Added a Home tab with a dashboard showing total items, average price, and shortcuts into the Menu, Search and Statistics tabs.
- 2026-11-04 — Kabelo Litheko — Replaced the plain items-per-course list on the Statistics screen with a bar chart, so each course's share of the menu is visible at a glance.

## References

Expo, 2026. Expo Documentation. Available at: https://docs.expo.dev [Accessed 5 September 2026].

Meta Platforms, Inc., 2026. React Native Documentation. Available at: https://reactnative.dev/docs/getting-started [Accessed 5 September 2026].

React Navigation, 2026. React Navigation Documentation. Available at: https://reactnavigation.org/docs/getting-started [Accessed 5 September 2026].

React Native Community, 2026. React Native Picker. Available at: https://github.com/react-native-picker/picker [Accessed 9 September 2026].

React Native Community, 2026. React Native Safe Area Context. Available at: https://github.com/th3rdwave/react-native-safe-area-context [Accessed 7 September 2026].
