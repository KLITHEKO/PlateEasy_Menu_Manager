import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

// This screen is opened when the chef taps on a menu item card on the
// Home screen. We only pass the item's id through navigation (a plain
// string, which is safe to pass as a param), then look the full item up
// from MenuContext here.
export default function EditItemScreen({ navigation, route }) {
  const { menuItems, updateItem, deleteItem } = useMenu();
  const { itemId } = route.params;

  const existingItem = menuItems.find((item) => item.id === itemId);

  // Pre-fill the form with the item's current values, so the chef edits
  // what is already there instead of starting from a blank form.
  const [name, setName] = useState(existingItem ? existingItem.name : '');
  const [description, setDescription] = useState(existingItem ? existingItem.description : '');
  const [course, setCourse] = useState(existingItem ? existingItem.course : '');
  const [price, setPrice] = useState(existingItem ? existingItem.price.toString() : '');

  function handleUpdate() {
    // Same validation as the Add Item screen, so an edit cannot save
    // invalid information either.
    if (name.trim() === '') {
      Alert.alert('Missing Dish Name', 'Please enter a dish name.');
      return;
    }

    if (description.trim() === '') {
      Alert.alert('Missing Description', 'Please enter a short description.');
      return;
    }

    if (course === '') {
      Alert.alert('Missing Course', 'Please select a course.');
      return;
    }

    if (price.trim() === '') {
      Alert.alert('Missing Price', 'Please enter a price.');
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      Alert.alert('Invalid Price', 'Price must be a number, e.g. 89.90');
      return;
    }

    if (priceNumber <= 0) {
      Alert.alert('Invalid Price', 'Price must be greater than R0.00');
      return;
    }

    const updatedItem = {
      id: itemId, // keep the same id, we are editing this item, not creating a new one
      name: name.trim(),
      description: description.trim(),
      course: course,
      price: priceNumber,
    };

    updateItem(updatedItem);

    Alert.alert('Success', `"${updatedItem.name}" was updated.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }

  function handleDelete() {
    // Ask for confirmation first, deleting cannot be undone.
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${existingItem ? existingItem.name : 'this item'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteItem(itemId);
            navigation.goBack();
          },
        },
      ]
    );
  }

  // If somehow the item can no longer be found (for example it was
  // already deleted), show a simple message instead of a broken form.
  if (!existingItem) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>Item Not Found</Text>
          <Text>This menu item no longer exists.</Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Go Back" onPress={() => navigation.goBack()} color="#888" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Edit Menu Item</Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Peri-Peri Chicken"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Short description of the dish"
          multiline
        />

        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={course} onValueChange={(value) => setCourse(value)}>
            <Picker.Item label="Select a course..." value="" />
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        <Text style={styles.label}>Price (R)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Update Item" onPress={handleUpdate} color="#4C3FA0" />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Delete Item" onPress={handleDelete} color="#C0392B" />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Cancel" onPress={() => navigation.goBack()} color="#888" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D9782D',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
});
