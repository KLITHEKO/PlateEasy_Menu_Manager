import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MenuProvider } from './context/MenuContext';

import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import SearchScreen from './screens/SearchScreen';
import StatisticsScreen from './screens/StatisticsScreen';

// This app uses two kinds of navigation.
// A stack navigator lets you move forward to a new screen and back again,
// like Home -> Add Item -> back to Home.
const Stack = createNativeStackNavigator();

// A tab navigator shows a row of tabs at the bottom of the screen
// (Menu, Search, Statistics) that the user can switch between at any time.
const Tab = createBottomTabNavigator();

// Home and Add Item are grouped in their own stack so we can navigate
// from the menu list to the add form and back.
function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
    </Stack.Navigator>
  );
}

// App is the very first component that runs. Everything else on screen
// is drawn inside this one.
export default function App() {
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
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false, // do not show the default title bar at the top of each screen
              tabBarActiveTintColor: '#D9782D', // colour used for the tab that is currently selected
              tabBarInactiveTintColor: '#999', // colour used for tabs that are not selected
            }}
          >
            {/* First tab: Menu. This shows the stack we made above,
                so it starts on Home and can move to Add Item. */}
            <Tab.Screen
              name="Menu"
              component={MenuStack}
              options={{
                // This decides which picture (icon) to show on the tab.
                // "focused" is true only when this tab is the one open
                // right now, so we show a filled icon when selected and
                // an outline icon when it is not selected.
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons name={focused ? 'restaurant' : 'restaurant-outline'} size={size} color={color} />
                ),
              }}
            />
            {/* Second tab: Search. Just a placeholder screen for now. */}
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
                ),
              }}
            />
            {/* Third tab: Statistics. Also a placeholder screen for now. */}
            <Tab.Screen
              name="Statistics"
              component={StatisticsScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
          {/* Sets the colour of the clock/battery icons at the very top of the phone screen */}
          <StatusBar style="dark" />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}