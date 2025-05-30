import { Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native'
import React from 'react'
import { styles } from '../theme/estilos' // Cambia 'estilos' por 'styles'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bienvenido a nuestro juego</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonIngresar]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRegistro]}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}