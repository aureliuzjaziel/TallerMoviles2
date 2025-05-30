import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import PerfilScreen from '../screens/PerfilScreen'
import JuegoScreen from '../screens/JuegoScreen'
import ScoreScreen from '../screens/ScoreScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import loginScreen from '../screens/LoginScreen'
import RegistroScreen from '../screens/RegistroScreen'

 


const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Juego" component={JuegoScreen} />
      <Drawer.Screen name="Puntuacion" component={ScoreScreen} />
    </Drawer.Navigator>
  )
}

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Drawer">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={loginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  )
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}