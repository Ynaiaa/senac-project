import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RadioButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    useEffect(() => console.log('usuario atual', usuarioAutenticado), [usuarioAutenticado, setUsuarioAutenticado])
    return (
        <AuthContext.Provider value={{ usuarioAutenticado, setUsuarioAutenticado }}>
            {children}
        </AuthContext.Provider>
    )
}

// Componente de tela inicial
function Inicio({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.detailsTitle}>Tela Inicial</Text>
            <Button title="Ir para Cadastro" onPress={() => navigation.navigate('Cadastro')} />
            <Button title="Ir para Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

// Componente de tela inicial
function InicioLog({ navigation }) {
    const { usuarioAutenticado } = useContext(AuthContext)
    console.log('aqui', usuarioAutenticado)
    return (
        <View style={styles.detailsTitle}>
            <Text style={styles.title}>Tela Inicial</Text>

            {usuarioAutenticado?.type === 'medico' ?
                <>
                    <Text style={styles.title}>Ola Dr. {usuarioAutenticado?.nome}, veja suas novas consultas.</Text>
                </> :
                <>
                    <Text style={styles.title}>Ola, {usuarioAutenticado?.nome}, veja ou agende suas proximas consultas.</Text>

                </>
            }
        </View>
    );
}

// Tela de Cadastro
function Cadastro({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Cadastro</Text>
            <Button title="Ir para Médico" onPress={() => navigation.navigate('Medico')} />
            <Button title="Ir para Paciente" onPress={() => navigation.navigate('Paciente')} />
        </View>
    );
}

// Tela de Cadastro de Paciente
function Paciente({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idade, setIdade] = useState('');

    const handleSignUp = () => {
        // Lógica de cadastro aqui
        console.log('Cadastrando como paciente');
    };

    return (
        <View style={styles.containerCadastro}>
            <Text style={styles.headerCadastro}>Cadastro de Usuário</Text>
            <TextInput
                style={styles.inputCadastro}
                placeholder="Nome"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder="Idade"
                value={idade}
                onChangeText={(text) => setIdade(text)}
            />
            <Button title="Cadastrar" onPress={handleSignUp} />
        </View>
    );
}

// Tela de Cadastro de Médico
function Medico({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Psicologo');

    const handleSignUp = () => {
        // Lógica de cadastro aqui
        console.log('Cadastrando como médico do tipo', userType);
    };

    return (
        <View style={styles.containerCadastro}>
            <Text style={styles.headerCadastro}>Cadastro de Médico</Text>
            <TextInput
                style={styles.inputCadastro}
                placeholder="Nome"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.inputCadastro}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.radioContainerCadastro}>
                <Text>Especialidade:</Text>
                <View style={styles.radioButtonCadastro}>
                    <RadioButton
                        value="Psicologo"
                        status={userType === 'Psicologo' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('Psicologo')}
                    />
                    <Text>Psicólogo</Text>
                </View>
                <View style={styles.radioButtonCadastro}>
                    <RadioButton
                        value="Clinico"
                        status={userType === 'Clinico' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('Clinico')}
                    />
                    <Text>Clínico</Text>
                </View>
                <View style={styles.radioButtonCadastro}>
                    <RadioButton
                        value="Oftalmologista"
                        status={userType === 'Oftalmologista' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('Oftalmologista')}
                    />
                    <Text>Oftalmologista</Text>
                </View>
                <View style={styles.radioButtonCadastro}>
                    <RadioButton
                        value="Urologista"
                        status={userType === 'Urologista' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('Urologista')}
                    />
                    <Text>Urologista</Text>
                </View>
            </View>
            <Button title="Cadastrar" onPress={handleSignUp} />
        </View>
    );
}

// Tela de Login
function Login({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setUsuarioAutenticado } = useContext(AuthContext)

    const handleLogin = () => {
        const serverUrl = 'http://localhost:3000'; // Use localhost para o ambiente local
        const data = {
            login: username,
            password: password
        }

        fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ')
                }
                return response.json()
            })

            .then(data => setUsuarioAutenticado(data))

        navigation.navigate('Main');
    };

    return (
        <View style={styles.containerLogin}>
            <TextInput
                style={styles.inputLogin}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.inputLogin}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}

// Tela com navegação por abas
function MainTabs() {
    return (
        <>
            <View>

            </View>
            <Tab.Navigator>
                <Tab.Screen
                    name="Inicio"
                    component={InicioLog}
                    options={{
                        headerShown: false,
                        tabBarLabel: "InicioLog",
                        tabBarIcon: ({ size }) => (<MaterialIcons name="home" color={'black'} size={size} />)
                    }}
                />
                <Tab.Screen
                    name="Consultas"
                    component={Consultas}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Consultas",
                        tabBarIcon: ({ size }) => (<MaterialIcons name="subject" color={'black'} size={size} />)
                    }}
                />
                <Tab.Screen
                    name="Agendar"
                    component={Agendar}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Agendar",
                        tabBarIcon: ({ size }) => (<MaterialIcons name="list-alt" color={'black'} size={size} />)
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

// tela de Agendar
function Agendar({ route }) {
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
        <View style={styles.containerAgendar}>
            <Text style={styles.detailsTitle}>Agendamentos</Text>

            <Text style={styles.subHeaderAgendar}>Novo Agendamento</Text>
            <View style={styles.formGroupAgendar}>
                <Text>Médico:</Text>
                <Picker
                    selectedValue={novaConsulta.medico_id}
                    onValueChange={(itemValue) => handleInputChange('medico_id', itemValue)}
                    style={styles.pickerAgendar}
                >
                    <Picker.Item label="Selecione um médico" value="" />
                    {medicos.map(medico => (
                        <Picker.Item key={medico.id} label={medico.nome} value={medico.id} />
                    ))}
                </Picker>
            </View>

            <View style={styles.formGroupAgendar}>
                <Text>Data:</Text>
                <TextInput
                    value={novaConsulta.data}
                    onChangeText={(text) => handleInputChange('data', text)}
                    placeholder="AAAA-MM-DD"
                    style={styles.inputAgendar}
                />
            </View>
            <View style={styles.formGroupAgendar}>
                <Text>Horário:</Text>
                <TextInput
                    value={novaConsulta.horario}
                    onChangeText={(text) => handleInputChange('horario', text)}
                    placeholder="HH:MM"
                    style={styles.inputAgendar}
                />
            </View>
            <Button title="Agendar" onPress={handleAgendar} />
        </View>
    );
}


// Tela de Agenda
function Consultas() {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { usuarioAutenticado } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:3000/consultas')
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(data => {
                console.log('aquis', usuarioAutenticado)
                if (usuarioAutenticado?.type === 'medico') {
                    setConsultas(data.filter((data) => data.medico_id === usuarioAutenticado?.id))
                } else {
                    setConsultas(data.filter((data) => data.paciente_id === usuarioAutenticado?.id))
                }

                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar consultas:', error);
                setError('Erro ao buscar consultas');
                setLoading(false);
            });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.popularItem}></Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.detailsTitle}>Consultas Agendadas</Text>
                </View>
                <View style={styles.consultasContainer}>
                    {loading ? (
                        <Text>Carregando...</Text>
                    ) : error ? (
                        <Text>{error}</Text>
                    ) : (
                        consultas.length > 0 ? (
                            consultas.map((consulta, index) => (
                                <View key={index} style={styles.consultaItem}>
                                    <Text>Data: {consulta.data}</Text>
                                    <Text>Horário: {consulta.hora}</Text>
                                    <Text>Médico ID: {consulta.medico_id}</Text>
                                    <Text>Paciente ID: {consulta.paciente_id}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noConsultasText}>Nenhuma consulta agendada.</Text>
                        )
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

// App Principal
export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Inicio">
                    <Stack.Screen name="Inicio" component={Inicio} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                    <Stack.Screen name="Paciente" component={Paciente} />
                    <Stack.Screen name="Medico" component={Medico} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    containerCadastro: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerCadastro: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputCadastro: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputLogin: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    radioContainerCadastro: {
        marginBottom: 10,
    },
    radioButtonCadastro: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    consultasContainer: {
        marginTop: 20,
    },
    consultaItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    noConsultasText: {
        fontStyle: 'italic',
        color: 'gray',
    },
    titleContainer: {
        alignItems: 'center',
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    containerAgendar: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerAgendar: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeaderAgendar: {
        fontSize: 18,
        marginBottom: 10,
    },
    formGroupAgendar: {
        marginBottom: 10,
    },
    pickerAgendar: {
        height: 50,
        width: '100%',
    },
    inputAgendar: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});
