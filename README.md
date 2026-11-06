# PlateEasy (Menu Manager)

## Student Details

Name: Kabelo Litheko
Student Number: ST10517550
Module: MAST5112
Assessment: Portfolio of Evidence (POE), Final POE

## Overview

PlateEasy is a mobile application developed using React Native (Meta Platforms, Inc., 2026) and the Expo framework (Expo, 2026) in response to the Chef's Menu Manager brief. The application allows the chef to add, edit and delete menu items, view the menu with automatic updates, and search and filter dishes by name or course. It also provides menu statistics, including item totals, average prices, the most and least expensive dishes, and a breakdown by course. Input validation and clear feedback are incorporated throughout the application to support a consistent and user-friendly experience.

## Features
PlateEasy is a mobile application developed using React Native (Meta Platforms, Inc., 2026) and the Expo framework (Expo, 2026) in response to the Chef's Menu Manager brief. The application allows the chef to add, edit and delete menu items, view the menu with automatic updates, and search and filter dishes by name or course. It also provides menu statistics, including item totals, average prices, the most and least expensive dishes, and a breakdown by course. Input validation and clear feedback are incorporated throughout the application to support a consistent and user-friendly experience.

### Application Features and Interface

PlateEasy supports the complete menu management workflow, from creating and organising dishes to reviewing the menu. The interface is built using React Native components (Meta Platforms, Inc., 2026), with a clear application title, readable text, consistent spacing and alignment. The overall layout follows the structure and design direction of the Part 1 wireframes, with adjustments made during development to improve the user experience and accommodate the implemented features.

When adding a dish, the chef enters its name, description, course and price using an appropriate input for each type of information. Newly added dishes appear in the menu immediately, without requiring a manual refresh.

Existing dishes can be selected from the Menu tab and edited using the same validation applied when adding a new dish. Dishes can also be deleted after a confirmation prompt, allowing mistakes to be corrected without having to recreate the entire menu item.

The Search tab allows dishes to be located by name and filtered by course. Selecting a search result opens the corresponding dish directly on the Edit screen.

The Statistics tab provides an overview of the menu, including the total number of items, average menu price, most and least expensive dishes, and a bar chart showing the number of items and average price for each course.

Required fields are validated before a dish can be saved. Specific error messages identify fields that need attention, while confirmation messages appear after successful additions, updates and deletions. The Home screen also displays an informative message when the menu is empty.

Navigation between the Home, Menu, Search and Statistics tabs, as well as the Add Item and Edit Item screens nested within the Menu tab, is managed using React Navigation (React Navigation, 2026). This structure allows the chef to move between the main sections of the application while accessing menu management screens within the Menu tab.

## Technology Stack

Expo SDK 58 (Expo, 2026)
React 19.3.0 and React Native 0.88.1 (Meta Platforms, Inc., 2026)
React Navigation, used for the tab bar and stack navigation (React Navigation, 2026)
React Native Safe Area Context, used to correctly handle device safe areas (React Native Community, 2026)
Expo Vector Icons, used for the tab bar icons (Expo, 2026)
Expo Font, used to load DM Sans and Source Sans 3 locally for consistent cross-platform typography (Expo, 2026)

## Design System

The app's colour palette, typography, spacing and corner-radius values are centralised in `constants/theme.js`, providing a single source of truth for the design system. This avoids individual screens defining their own values and helps maintain a consistent appearance throughout the app.

The colour palette is restricted to five colours: Black, Carrot Orange, Dim Grey, White and Cornflower Ocean. Each colour has a defined functional role. For example, Carrot Orange is reserved for Add and Save actions, while Cornflower Ocean is used for navigation and selected states. This follows the UI design principle of using a limited, purposeful colour palette to create a clear visual hierarchy and improve readability (freeCodeCamp, 2026).

Typography uses DM Sans for screen titles and section headings, while Source Sans 3 is used for other interface text, including dish names, prices, buttons and labels. Both typefaces are loaded locally using Expo Font rather than relying on system defaults, helping maintain consistent typography across iOS and Android (Google, 2026a; Google, 2026c).

The design also uses a minimum button height of 52px, consistent spacing and platform-appropriate card shadows. These choices were considered against Apple's Human Interface Guidelines (Apple Inc., 2026) and Google's Material Design 3 guidance (Google, 2026b). Text and background colour combinations were also checked against the minimum contrast requirements in the Web Content Accessibility Guidelines (W3C, 2026).

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

## Development History

### 4 November 2026

- **Menu management:** Added the ability to edit and delete existing menu items (Manage Menu Items).
- **Statistics:** Created the Statistics screen to display total menu items, average price and item counts per course (Display Menu Statistics).
- **Search and filtering:** Added dish-name search and course filtering (Search and Filter Menu Items).
- **Project upgrade:** Upgraded from Expo SDK 57 to Expo SDK 58, using React Native 0.88.1 and React 19.3.0 to match the installed Expo Go version.
- **Search navigation:** Made search results selectable, opening the corresponding dish directly on the Edit screen.
- **Course statistics:** Added average price per course to the Statistics screen.
- **Home dashboard:** Added a Home tab with a dashboard showing menu information and shortcuts to the Menu, Search and Statistics tabs.
- **Statistics chart:** Replaced the items-per-course list with a bar chart for a clearer visual comparison.

### 5 November 2026

- **Splash screen:** Added a custom splash screen using the app's logo instead of the default Expo splash.
- **Price overview:** Added a Most / Least Expensive Dish card to the Statistics screen.

### 6 November 2026

- **Design system:** Finalised and documented the app's colour palette, typography, spacing and component styling in `constants/theme.js`. Design decisions were informed by colour theory, WCAG 2.2 contrast guidance and platform design conventions (freeCodeCamp, 2026; W3C, 2026; Apple Inc., 2026; Google, 2026b).
- **Typography:** Added local DM Sans and Source Sans 3 font files using Expo Font for consistent typography across iOS and Android (Google, 2026a; Google, 2026c).
- **Home dashboard update:** Reworked the Home screen to show item counts per course instead of repeating the totals available on the Statistics screen. Replaced the Search and Statistics shortcuts with an Add New Dish shortcut.
- **Course selection:** Replaced the Picker controls on the Add, Edit and Search screens with a reusable `ChipSelector` component and removed the unused React Native Picker dependency.
- **Reusable components:** Extracted `AppButton` and `DishCard` into shared components for use across the Home, Menu and Search screens, reducing duplicated styling and code.
- **Light and dark mode:** Added automatic light and dark mode based on the device's system appearance using React Native's `useColorScheme()` (Meta Platforms, Inc., 2026). Added a dark colour palette and shared `useAppTheme` hook in `constants/theme.js`, then updated all screens and shared components to respond to the active theme.
- **Course indicators:** Added colour indicators to distinguish Starter, Main Course and Dessert across dish cards, selection chips, Home course-coverage cards and the Statistics chart.
- **Home screen layout:** Centred the greeting, subtitle and logo row for a more balanced layout.
- **Splash transition:** Added a fade transition when the splash screen closes.
- **Course colour refinement:** Replaced the initial tonal-grey course indicators with three distinct colours: Chartreuse for Starter, Teal for Main Course and Magenta for Dessert. Added separate light-mode and dark-mode colour values where needed to maintain readable contrast against card surfaces, following WCAG 2.2 guidance (W3C, 2026).

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
