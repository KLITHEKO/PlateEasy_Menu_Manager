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

export default function AddItemScreen({ navigation }) {
  const { addItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  function handleSave() {
    // Check each field one at a time and tell the chef exactly what's
    // missing or wrong before we save anything.
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

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course: course,
      price: priceNumber,
    };

    addItem(newItem);

    Alert.alert('Success', `"${newItem.name}" was added to the menu.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Add Menu Item</Text>

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
          <Button title="Save Item" onPress={handleSave} color="#4C3FA0" />
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
