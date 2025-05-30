import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function RegistroScreen() {
  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [repetirContrasena, setRepetirContrasena] = useState('')
  const [numero, setNumero] = useState('')

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          placeholder='Usuario'
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder='Correo'
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
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
        <TextInput
          placeholder='Repetir contraseña'
          style={styles.input}
          value={repetirContrasena}
          onChangeText={setRepetirContrasena}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TextInput
          placeholder='Número'
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonRegistro]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

