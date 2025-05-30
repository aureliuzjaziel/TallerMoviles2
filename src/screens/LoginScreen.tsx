import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function loginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Inicia Sesión</Text>
        <TextInput
          placeholder='Usuario'
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder='Contraseña'
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonIngresar]}
          onPress={() => navigation.navigate('Drawer')}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}