import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';
import { SPACING } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import DishCard from '../components/DishCard';

export default function HomeScreen({ navigation }) {
  // Menu items live in MenuContext now, so both this screen and AddItem
  // can reach them without passing a function through navigation params.
  const { menuItems } = useMenu();
  const { colors, type } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  function renderItem({ item }) {
    return (
      // Tapping a card opens it on the Edit screen. We only pass the
      // item's id (a plain string) through navigation, not the whole
      // item or any functions.
      <DishCard item={item} onPress={() => navigation.navigate('EditItem', { itemId: item.id })} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[type.screenTitle, styles.title]}>Your Menu</Text>
      <Text style={[type.bodyGrey, styles.subtitle]}>
        {menuItems.length} {menuItems.length === 1 ? 'dish' : 'dishes'}
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={[type.bodyGrey, styles.emptyText]}>
            No menu items yet. Tap the + button to add your first dish!
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddItem')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
    },
    title: {
      marginBottom: 3,
    },
    subtitle: {
      marginBottom: SPACING.lg,
    },
    emptyText: {
      marginTop: 40,
      textAlign: 'center',
    },
    fab: {
      position: 'absolute',
      right: 18,
      bottom: 24,
      width: 54,
      height: 54,
      borderRadius: 16,
      backgroundColor: colors.orange,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.orange,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 6,
    },
    fabIcon: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '300',
    },
  });
}
