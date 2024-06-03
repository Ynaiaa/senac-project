import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';


import { createStackNavigator } from '@react-navigation/stack';

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
    <ScrollView>
      <View>
        <Text style={styles.popularItem}></Text>
        <View style={styles.titleContainer}>
          <Text style={styles.detailsTitle}>Próximas consultas</Text>
        </View>
      </View>
      <View>
        <View style={styles.titleContainer}>
        //aqui ele lista as consultas existentes ou caso não tenha não lista nada
        </View>
      </View>
      <View>
        <Text style={styles.popularItem}></Text>
        <View style={styles.titleContainer}>
          <Text style={styles.detailsTitle}>Agendar</Text>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
            }}
          />
        </View>
        {selectedDate !== '' && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>Data selecionada: {selectedDate}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}



function detalhes({route}) {
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
      <Tab.Screen name="Inicio" component={Inicio} options={{headerShown: false,
        tabBarLabel: "", tabBarIcon: ({ size }) => (<MaterialIcons name="home" color={'black'} size={size} />)}} />

      <Tab.Screen name="Consultas" component={Agenda} options={{ tabBarLabel: "", tabBarIcon: ({size}) => ( 
          <MaterialIcons name="subject" color={'black'} size={size} />)}}/>

      <Tab.Screen name="Detalhes" component={detalhes} options={{
        tabBarLabel: "", tabBarIcon: ({ size }) => (<MaterialIcons name="list-alt" color={'black'} size={size} />) }} />

    </Tab.Navigator>
    </NavigationContainer>
  );
}


// Styles dos componentes
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

export default App;


