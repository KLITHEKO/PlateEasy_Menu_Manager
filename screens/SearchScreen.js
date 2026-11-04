import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

export default function SearchScreen({ navigation }) {
  const { menuItems } = useMenu();

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
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Menu', { screen: 'EditItem', params: { itemId: item.id } })}
      >
        <View style={styles.cardTopRow}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.price}>R{item.price}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>{item.course}</Text>
      </TouchableOpacity>
    );
  }

  const hasActiveSearch = searchText.trim() !== '' || courseFilter !== '';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Menu</Text>

      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by dish name"
      />

      <View style={styles.pickerBox}>
        <Picker selectedValue={courseFilter} onValueChange={(value) => setCourseFilter(value)}>
          <Picker.Item label="All Courses" value="" />
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>
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
          <Text style={styles.emptyText}>
            {menuItems.length === 0
              ? 'No menu items yet. Add a dish from the Menu tab first.'
              : 'No menu items match your search.'}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9782D',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  clearButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  clearButtonText: {
    color: '#4C3FA0',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 14,
    marginBottom: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B8631F',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  course: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4C3FA0',
  },
});
