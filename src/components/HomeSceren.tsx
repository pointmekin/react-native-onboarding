import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeSceren = () => {

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding')
    } catch (error) {
      console.log('Error @clearOnboarding: ', error)
    }
  }

  return (
    <View>
      <Text>Homescreen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeSceren;

const styles = StyleSheet.create({});
