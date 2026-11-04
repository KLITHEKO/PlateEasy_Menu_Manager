import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MenuProvider } from './context/MenuContext';

import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';
import SearchScreen from './screens/SearchScreen';
import StatisticsScreen from './screens/StatisticsScreen';

// This app uses two kinds of navigation.
// A stack navigator lets you move forward to a new screen and back again,
// like Home -> Add Item -> back to Home.
const Stack = createNativeStackNavigator();

// A tab navigator shows a row of tabs at the bottom of the screen
// (Menu, Search, Statistics) that the user can switch between at any time.
const Tab = createBottomTabNavigator();

// A small helper so each tab doesn't repeat the same "wrap the icon in a
// tinted pill when this tab is the active one" logic. Keeping the active
// tab's icon on a soft rounded background, instead of just changing its
// colour, is what stops a plain white tab bar from feeling flat.
function TabIcon({ focused, color, size, nameFocused, nameUnfocused }) {
  return (
    <View style={focused ? styles.activeIconPill : styles.iconWrap}>
    <Ionicons name={focused ? nameFocused : nameUnfocused} size={size} color={color} />
    </View>
  );
}

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
              // A tinted background instead of plain white, plus a soft
              // shadow/elevation so the bar visually lifts above the
              // screen content rather than sitting flat against it.
              tabBarStyle: styles.tabBar,
              tabBarLabelStyle: styles.tabBarLabel,
            }}
          >
            {/* First tab: Menu. This shows the stack we made above,
                so it starts on Home and can move to Add Item. */}
            <Tab.Screen
              name="Menu"
              component={MenuStack}
              options={{
                // This decides which picture ((icon) to show on the tab.
                // "focused" is true only when this tab is the one open
                // right now, so we show a filled icon when selected and
                // an outline icon when it is not selected.
                tabBarIcon: ({ color, size, focused }) => (
                  <TabIcon
                    focused={focused}
                    color={color}
                    size={size}
                    nameFocused="restaurant"
                    nameUnfocused="restaurant-outline"
                  />
                ),
              }}
            />
            {/* Second tab: Search. */}
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <TabIcon
                    focused={focused}
                    color={color}
                    size={size}
                    nameFocused="search"
                    nameUnfocused="search-outline"
                  />
                ),
              }}
            />
            {/* Third tab: Statistics. */}
            <Tab.Screen
              name="Statistics"
              component={StatisticsScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <TabIcon
                    focused={focused}
                    color={color}
                    size={size}
                    nameFocused="stats-chart"
                    nameUnfocused="stats-chart-outline"
                  />
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F7F4EF', // cream, matches the rest of the app instead of stark white
    borderTopWidth: 0,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
    // Shadow so the bar lifts above the screen content.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8, // Android's equivalent of the shadow props above
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  iconWrap: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  activeIconPill: {
    backgroundColor: '#FBE4CC', // soft tint of the brand orange
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
});