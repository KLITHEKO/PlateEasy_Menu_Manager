import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMenu } from '../context/MenuContext';
import { RADIUS_INPUT, SPACING, COURSES, FONTS } from '../constants/theme';
import useAppTheme from '../hooks/useAppTheme';
import ChipSelector from '../components/ChipSelector';
import AppButton from '../components/AppButton';

const COURSE_OPTIONS = COURSES.map((course) => ({ label: course, value: course, course }));

export default function AddItemScreen({ navigation }) {
  const { addItem } = useMenu();
  const { colors, type } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[type.screenTitle, styles.title]}>Add New Dish</Text>

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

        <AppButton label="Save Dish" variant="action" onPress={handleSave} />
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
