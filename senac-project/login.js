import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
      <Text style={styles.header}>Login de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#A9A9A9"
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>User Type:</Text>
        <View style={styles.radioButton}>
          <RadioButton
            value="doctor"
            status={userType === 'doctor' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('doctor')}
            color="#1E90FF"
          />
          <Text style={styles.radioText}>Doctor</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="patient"
            status={userType === 'patient' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('patient')}
            color="#1E90FF"
          />
          <Text style={styles.radioText}>Patient</Text>
        </View>
      </View>
      <Button title="Login" onPress={handleLogin} color="#1E90FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2E8B57',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#B0C4DE',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#2E8B57',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioText: {
    fontSize: 16,
    color: '#2E8B57',
  },
});

export default LoginScreen;
