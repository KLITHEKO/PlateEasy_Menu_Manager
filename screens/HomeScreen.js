import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen({ navigation }) {
  // Menu items live in MenuContext now, so both this screen and AddItem
  // can reach them without passing a function through navigation params.
  const { menuItems } = useMenu();

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.price}>R{item.price}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>{item.course}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu Items</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No menu items yet. Tap the + button to add your first dish!
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#D9782D',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});
