import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';
import { RADIUS_INPUT, SPACING, COURSES, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import ChipSelector from '../components/ChipSelector';
import AppButton from '../components/AppButton';

const COURSE_OPTIONS = COURSES.map((course) => ({ label: course, value: course, course }));

// This screen is opened when the chef taps on a menu item card. We only
// pass the item's id through navigation (a plain string, which is safe
// to pass as a param), then look the full item up from MenuContext here.
export default function EditItemScreen({ navigation, route }) {
  const { menuItems, updateItem, deleteItem } = useMenu();
  const { itemId } = route.params;
  const { colors, type } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
        <View style={styles.scrollContent}>
          <Text style={[type.screenTitle, styles.title]}>Item Not Found</Text>
          <Text style={type.bodyGrey}>This menu item no longer exists.</Text>
          <View style={{ marginTop: SPACING.lg }}>
            <AppButton label="Go Back" variant="ghost" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[type.screenTitle, styles.title]}>Edit Menu Item</Text>

        <Text style={[type.label, styles.label]}>Dish Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Peri-Peri Chicken"
          placeholderTextColor={colors.placeholder}
        />

        <Text style={[type.label, styles.label]}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Short description of the dish"
          placeholderTextColor={colors.placeholder}
          multiline
        />

        <Text style={[type.label, styles.label]}>Price (R)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          placeholderTextColor={colors.placeholder}
          keyboardType="decimal-pad"
        />

        <Text style={[type.label, styles.label]}>Course</Text>
        <View style={styles.chipWrapper}>
          <ChipSelector options={COURSE_OPTIONS} value={course} onChange={setCourse} />
        </View>

        <AppButton label="Update Item" variant="action" onPress={handleUpdate} />
        <AppButton label="Delete Item" variant="destructive" onPress={handleDelete} />
        <AppButton label="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
      paddingBottom: 40,
    },
    title: {
      marginBottom: SPACING.lg,
    },
    label: {
      marginBottom: 6,
      marginTop: SPACING.sm,
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: RADIUS_INPUT,
      padding: 13,
      fontFamily: FONTS.body,
      fontSize: 14,
      color: colors.textPrimary,
    },
    multilineInput: {
      height: 80,
      textAlignVertical: 'top',
    },
    chipWrapper: {
      marginBottom: SPACING.lg,
    },
  });
}
