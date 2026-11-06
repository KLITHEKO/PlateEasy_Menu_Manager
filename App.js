import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { MenuProvider } from './context/MenuContext';
import useAppTheme from './hooks/useAppTheme';

import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';
import SearchScreen from './screens/SearchScreen';
import StatisticsScreen from './screens/StatisticsScreen';

// Keep the native splash screen up until DM Sans / Source Sans 3 have
// finished loading below, so the chef never sees a flash of the system
// font swap to the real one a moment later.
SplashScreen.preventAutoHideAsync();

// Fade the splash logo out instead of it just vanishing the instant the
// app is ready — a soft transition into the Home screen rather than an
// abrupt cut.
SplashScreen.setOptions({ duration: 400, fade: true });

// This app uses two kinds of navigation.
// A stack navigator lets you move forward to a new screen and back again,
// like Home -> Add Item -> back to Home.
const Stack = createNativeStackNavigator();

// A tab navigator shows a row of tabs at the bottom of the screen
// (Home, Menu, Search, Statistics) that the user can switch between at any time.
const Tab = createBottomTabNavigator();

// Home and Add Item are grouped in their own stack so we can navigate
// from the menu list to the add form and back.
function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="EditItem" component={EditItemScreen} />
    </Stack.Navigator>
  );
}

// App is the very first component that runs. Everything else on screen
// is drawn inside this one.
export default function App() {
  // Local fonts — DM Sans for headings, Source Sans 3 for everything
  // else. The keys here are the exact fontFamily names used throughout
  // the app (see constants/theme.js FONTS).
  const [fontsLoaded, fontError] = useFonts({
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
    'SourceSans3-Regular': require('./assets/fonts/SourceSans3-Regular.ttf'),
    'SourceSans3-Medium': require('./assets/fonts/SourceSans3-Medium.ttf'),
    'SourceSans3-SemiBold': require('./assets/fonts/SourceSans3-SemiBold.ttf'),
  });

  // Follows the phone's system light/dark setting — no in-app toggle, by
  // design (see hooks/useAppTheme.js).
  const { scheme, colors } = useAppTheme();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Render nothing (the native splash screen is still showing) until the
  // fonts are ready or have failed — never show the app with the wrong
  // typeface for a moment.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // React Navigation's own light/dark themes control the colour of the
  // space behind/around screens during transitions, independently of
  // our own screen backgrounds.
  const navigationTheme = {
    ...(scheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      border: colors.border,
      text: colors.textPrimary,
      primary: colors.blue,
    },
  };

  return (
    // SafeAreaProvider tells the rest of the app how much space to leave
    // at the top and bottom of the screen, so content does not get hidden
    // behind things like the phone's notch or home bar.
    <SafeAreaProvider>
      {/* MenuProvider shares the list of menu items with every screen
          inside it. This means HomeScreen and AddItemScreen can both use
          the same list without me having to pass it manually between
          them. This is called Context, it is a bit more advanced than
          plain useState, but it solves the problem of two screens needing
          the same data at the same time. */}
      <MenuProvider>
        {/* NavigationContainer has to wrap all the navigation in the app.
            It keeps track of which screen is currently showing. */}
        <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false, // do not show the default title bar at the top of each screen
              // Cornflower Ocean is reserved for navigation and selected
              // elements only, per the design brief — so it's the active
              // tab colour and nothing else in the tab bar.
              tabBarActiveTintColor: colors.blue,
              tabBarInactiveTintColor: colors.textSecondary,
              tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
              tabBarLabelStyle: { fontFamily: 'SourceSans3-Regular', fontSize: 11 },
            }}
          >
            {/* First tab: Home. A simple dashboard — a greeting, the
                headline numbers, and shortcuts into the other tabs. */}
            <Tab.Screen
              name="Home"
              component={DashboardScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                ),
              }}
            />
            {/* Second tab: Menu. This shows the stack we made above, so
                it starts on Home and can move to Add Item. */}
            <Tab.Screen
              name="Menu"
              component={MenuStack}
              options={{
                // This decides which picture (icon) to show on the tab.
                // "focused" is true only when this tab is the one open
                // right now, so we show a filled icon when selected and
                // an outline icon when it is not selected.
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? 'restaurant' : 'restaurant-outline'}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            {/* Third tab: Search. */}
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? 'search' : 'search-outline'}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            {/* Fourth tab: Statistics. */}
            <Tab.Screen
              name="Statistics"
              component={StatisticsScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? 'stats-chart' : 'stats-chart-outline'}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
          {/* Light icons (clock/battery) on a dark screen, dark icons on
              a light screen — follows the same system scheme as
              everything else. */}
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
