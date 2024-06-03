import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet } from 'react-native';

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

    function Inicio() {
      return (
        <ScrollView>
          <View style={styles.containerka}>

          </View>
        </ScrollView>
      );
    }

    // senac-project

    function Agenda() {
      const [selectedDate, setSelectedDate] = useState('');

      const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        console.log('Selected date:', day.dateString); // yyyy-mm-dd
        console.log('Day:', day.day); // Day of the month
        console.log('Month:', day.month); // Month
        console.log('Year:', day.year); // Year
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
        </View>
      )
    }



    function detalhes({ route }) {
      return (
        <ScrollView>
          <View style={styles.headerImageContainer}>
          </View>
        </ScrollView>
      )
    }

    //Chamando as funções para navegação por bottom tabs (menu inferior)
    //Na chamada da home chamei a função My Stack, assim posso usar tanto o bottom tabs quanto o Stack vavigator para navegar entre as telas 
    const Tab = createBottomTabNavigator();

    function App() {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Inicio" component={Inicio} options={{
              headerShown: false,
              tabBarLabel: "", tabBarIcon: ({ size }) => (<MaterialIcons name="home" color={'black'} size={size} />)
            }} />

            <Tab.Screen name="Consultas" component={Agenda} options={{
              tabBarLabel: "", tabBarIcon: ({ size }) => (
                <MaterialIcons name="subject" color={'black'} size={size} />)
            }} />

            <Tab.Screen name="Detalhes" component={detalhes} options={{
              tabBarLabel: "", tabBarIcon: ({ size }) => (<MaterialIcons name="list-alt" color={'black'} size={size} />)
            }} />

          </Tab.Navigator>
        </NavigationContainer>
      );
    };

    const styles = StyleSheet.create({
      calendarContainer: {
        margin: 20,
      },

      headerImageContainer: {
        height: 347,
        backgroundColor: '#ECECEC',
        paddingTop: 99,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        ustifyContent: 'center'
      },
      popularItem: {
        margin: 12,
        fontSize: 9,
        color: 'rgba(0, 0, 0, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
      },

      titleContainer: {
        margin: 12,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center' // Centraliza horizontalmente
      },

      detailsTitle: {
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        fontSize: 16,
        color: '#000000'
      },

    });


  }
}
export default Agendamentos;