import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMenu } from '../context/MenuContext';
import { RADIUS, SPACING, COURSES, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import ChipSelector from '../components/ChipSelector';
import DishCard from '../components/DishCard';

// '' means "all courses" — included as its own chip (no course dot, since
// it doesn't represent a single course) so the filter row always has
// something selected, same pattern as the course selector on the
// Add/Edit forms.
const FILTER_OPTIONS = [
  { label: 'All', value: '' },
  ...COURSES.map((course) => ({ label: course, value: course, course })),
];

export default function SearchScreen({ navigation }) {
  const { menuItems } = useMenu();
  const { colors, type } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState(''); // '' means "all courses"

  // Start from every menu item, then narrow it down step by step based
  // on what the chef has typed and selected.
  let filteredItems = menuItems;

  if (searchText.trim() !== '') {
    const lowerSearch = searchText.trim().toLowerCase();
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    );
  }

  if (courseFilter !== '') {
    filteredItems = filteredItems.filter((item) => item.course === courseFilter);
  }

  function handleClear() {
    setSearchText('');
    setCourseFilter('');
  }

  function renderItem({ item }) {
    return (
      // Tapping a result opens it on the Edit screen, same as tapping a
      // card on the Menu tab. EditItem lives inside the Menu tab's own
      // stack, so we navigate across tabs by naming the tab first, then
      // the screen inside it, same pattern used from the Home screen.
      <DishCard
        item={item}
        onPress={() =>
          navigation.navigate('Menu', { screen: 'EditItem', params: { itemId: item.id } })
        }
      />
    );
  }

  const hasActiveSearch = searchText.trim() !== '' || courseFilter !== '';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[type.screenTitle, styles.title]}>Search Menu</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={17} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search dishes..."
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <View style={styles.filterWrapper}>
        <ChipSelector options={FILTER_OPTIONS} value={courseFilter} onChange={setCourseFilter} />
      </View>

      {hasActiveSearch && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear Search and Filter</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={[type.bodyGrey, styles.emptyText]}>
            {menuItems.length === 0
              ? 'No menu items yet. Add a dish from the Menu tab first.'
              : 'No menu items match your search.'}
          </Text>
        }
      />
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
      marginBottom: SPACING.lg,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: RADIUS,
      paddingHorizontal: 14,
      marginBottom: SPACING.sm,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 13,
      fontFamily: FONTS.body,
      fontSize: 14,
      color: colors.textPrimary,
    },
    filterWrapper: {
      marginBottom: SPACING.sm,
    },
    clearButton: {
      alignSelf: 'flex-start',
      marginBottom: SPACING.md,
    },
    clearButtonText: {
      fontFamily: FONTS.bodyMedium,
      fontSize: 13,
      color: colors.blue,
    },
    emptyText: {
      marginTop: 40,
      textAlign: 'center',
    },
  });
}
