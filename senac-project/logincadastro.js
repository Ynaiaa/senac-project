import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in as', userType);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.radioContainer}>
        <Text>User Type:</Text>
        <View style={styles.radioButton}>
          <RadioButton
            value="doctor"
            status={userType === 'doctor' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('doctor')}
          />
          <Text>Doctor</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="patient"
            status={userType === 'patient' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('patient')}
          />
          <Text>Patient</Text>
        </View>
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default LoginScreen;