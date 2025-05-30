import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../theme/estilos'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function PerfilScreen({ navigation }: any) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Perfil</Text>
        {/* Aquí puedes agregar más información del perfil */}
        <TouchableOpacity
          style={[styles.button, styles.buttonIngresar]}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.buttonText}>Abrir menú</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}