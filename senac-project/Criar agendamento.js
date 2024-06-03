import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';

const Agendamentos = () => {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [novaConsulta, setNovaConsulta] = useState({
    medico_id: '',
    paciente_id: '',
    data: '',
    horario: ''
  });

  useEffect(() => {
    const serverUrl = 'http://localhost:3000'; // Use localhost para o ambiente local

    fetch(`${serverUrl}/medicos`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar médicos');
        }
        return res.json();
      })
      .then(data => {
        console.log('Médicos:', data);
        setMedicos(data);
      })
      .catch(err => console.error('Erro ao buscar médicos:', err));

    fetch(`${serverUrl}/pacientes`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar pacientes');
        }
        return res.json();
      })
      .then(data => {
        console.log('Pacientes:', data);
        setPacientes(data);
      })
      .catch(err => console.error('Erro ao buscar pacientes:', err));
  }, []);

  const handleInputChange = (name, value) => {
    setNovaConsulta({ ...novaConsulta, [name]: value });
  };

  const handleAgendar = () => {
    const serverUrl = 'http://localhost:3000'; // Use localhost para o ambiente local

    fetch(`${serverUrl}/consultas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaConsulta),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao agendar consulta');
        }
        return res.json();
      })
      .then(data => {
        console.log('Consulta agendada com sucesso:', data);
        setNovaConsulta({
          medico_id: '',
          paciente_id: '',
          data: '',
          horario: ''
        });
      })
      .catch(err => console.error('Erro ao agendar consulta:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agendamentos</Text>
      
      <Text style={styles.subHeader}>Novo Agendamento</Text>
      <View style={styles.formGroup}>
        <Text>Médico:</Text>
        <Picker
          selectedValue={novaConsulta.medico_id}
          onValueChange={(itemValue) => handleInputChange('medico_id', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um médico" value="" />
          {medicos.map(medico => (
            <Picker.Item key={medico.id} label={medico.nome} value={medico.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Paciente:</Text>
        <Picker
          selectedValue={novaConsulta.paciente_id}
          onValueChange={(itemValue) => handleInputChange('paciente_id', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um paciente" value="" />
          {pacientes.map(paciente => (
            <Picker.Item key={paciente.id} label={paciente.nome} value={paciente.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Data:</Text>
        <TextInput
          value={novaConsulta.data}
          onChangeText={(text) => handleInputChange('data', text)}
          placeholder="AAAA-MM-DD"
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Horário:</Text>
        <TextInput
          value={novaConsulta.horario}
          onChangeText={(text) => handleInputChange('horario', text)}
          placeholder="HH:MM"
          style={styles.input}
        />
      </View>
      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Agendamentos;
