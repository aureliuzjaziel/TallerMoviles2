import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import PerfilScreen from '../screens/PerfilScreen'
import JuegoScreen from '../screens/JuegoScreen'
import ScoreScreen from '../screens/ScoreScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

import RegistroScreen from '../screens/RegistroScreen'
import App from '../components/App'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'


 


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
       
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Juego" component={JuegoScreen} />
      <Drawer.Screen name="Puntuacion" component={ScoreScreen} />
      
    </Drawer.Navigator>
  )
}



export default function Navigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}