import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMenu } from '../context/MenuContext';

// The Home tab. Laid out to match the Home screen mockup: a logo row, a
// greeting with a one-line subtitle, two headline-number boxes side by
// side, a button into the menu, and two shortcut cards into Search and
// Statistics. Everything is centred as a group in the space below the
// logo row, same as the mockup.
export default function DashboardScreen({ navigation }) {
  const { menuItems } = useMenu();

  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            {/* The app's real logo mark (the pan-and-flame glyph cropped
                out of assets/icon.png — the same icon used for the app's
                home-screen icon), not a text placeholder. */}
            <Image
              source={require('../assets/logo-mark.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>PlateEasy</Text>
        </View>

        <Text style={styles.greeting}>Welcome back, Chef!</Text>
        <Text style={styles.subtitle}>Here's a quick look at your menu.</Text>

        <View style={styles.statRow}>
          <View style={styles.statMini}>
            <Text style={styles.statLabel}>TOTAL ITEMS</Text>
            <Text style={styles.statValue}>{totalItems}</Text>
          </View>
          <View style={styles.statMini}>
            <Text style={styles.statLabel}>AVG PRICE</Text>
            <Text style={styles.statValue}>R{averagePrice.toFixed(2)}</Text>
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
            <Ionicons name="search" size={20} color="#444" style={styles.quickLinkIcon} />
            <Text style={styles.quickLinkText}>Search Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('Statistics')}
          >
            <Ionicons name="stats-chart" size={20} color="#444" style={styles.quickLinkIcon} />
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
  },
  // The whole block is centred as a group in the available space, same as
  // the mockup's #screen-home .content, rather than pinned to the top.
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#D9782D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoImage: {
    width: 24,
    height: 17,
  },
  appName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#B8631F',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  statMini: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4C3FA0',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B8631F',
  },
  ctaButton: {
    backgroundColor: '#D9782D',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
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
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quickLinkIcon: {
    marginBottom: 6,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
  },
});
