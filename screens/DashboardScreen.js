import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useMenu } from '../context/MenuContext';

// The Home tab. Unlike the Menu tab (which jumps straight into the list of
// dishes), this is a small dashboard: a greeting, the two headline numbers
// a chef cares about at a glance, a button into the menu, and shortcuts
// into Search and Statistics so every tab is reachable from here too.
export default function DashboardScreen({ navigation }) {
  const { menuItems } = useMenu();

  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>PE</Text>
        </View>
        <Text style={styles.appName}>PlateEasy</Text>
      </View>

      {/* Everything below is centred as a group, both horizontally and in
          the remaining vertical space, rather than stacked from the top. */}
      <View style={styles.centeredContent}>
        <Text style={styles.greeting}>Welcome back, Chef!</Text>

        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalItems}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>R{averagePrice.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Avg Price</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.ctaButtonText}>Manage Your Menu</Text>
        </TouchableOpacity>

        <View style={styles.quickLinksRow}>
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('Search')}
          >
            <MaterialIcons name="search" size={22} color="#4C3FA0" />
            <Text style={styles.quickLinkText}>Search Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('Statistics')}
          >
            <MaterialIcons name="bar-chart" size={22} color="#4C3FA0" />
            <Text style={styles.quickLinkText}>View Stats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#D9782D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // This View takes up all the leftover vertical space below the header
  // and centers its children inside that space, both vertically and
  // horizontally, instead of leaving everything pinned to the top.
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  statBox: {
    alignItems: 'center',
    minWidth: 90,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B8631F',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: '#D9782D',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 24,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  quickLinksRow: {
    flexDirection: 'row',
  },
  quickLink: {
    alignItems: 'center',
    marginHorizontal: 18,
  },
  quickLinkText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4C3FA0',
  },
});
