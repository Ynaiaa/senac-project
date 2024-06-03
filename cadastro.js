import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('paciente');

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log('Signing up as', userType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
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
            value="doutor"
            status={userType === 'doutor' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('doutor')}
          />
          <Text>Doutor</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="paciente"
            status={userType === 'paciente' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('paciente')}
          />
          <Text>Paciente</Text>
        </View>
      </View>
      <Button title="Sign Up" onPress={handleSignUp} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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

export default SignUpScreen;