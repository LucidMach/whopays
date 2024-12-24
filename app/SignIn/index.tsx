import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

function PhoneSignIn() {
  const [confirm, setConfirm] = useState(null); // For OTP confirmation
  const [code, setCode] = useState(''); // OTP code
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone number input

  // Handle auth state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        Alert.alert('Success', 'You are signed in!');
        console.log('User:', user);
        // Redirect or update UI as needed
      }
    });
    return subscriber; // Cleanup subscription on unmount
  }, []);

  // Send OTP to the phone number
  async function signInWithPhoneNumber() {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  }

  // Verify OTP code
  async function confirmCode() {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }

    try {
      await confirm.confirm(code);
      Alert.alert('Success', 'You are successfully signed in!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {!confirm ? (
        <>
          <Text style={styles.label}>Enter your phone number:</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 650-555-3434"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Button
            title="Send OTP"
            onPress={signInWithPhoneNumber}
            color="#1E90FF"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter the verification code:</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />
          <Button
            title="Confirm OTP"
            onPress={confirmCode}
            color="#1E90FF"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default PhoneSignIn;
