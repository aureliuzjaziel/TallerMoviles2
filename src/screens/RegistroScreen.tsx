import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

import { auth} from '../../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [repetirContrasena, setRepetirContrasena] = useState('')
  const [numero, setNumero] = useState('')

  function Registro()
{
  createUserWithEmailAndPassword(auth, usuario, contrasena)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          placeholder='Usuario'
          style={styles.input}
          onChangeText={(texto) => setUsuario(texto)}
          value={usuario}
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
          onChangeText={(texto) => setContrasena(texto)}
          value={contrasena}
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
          onPress={() => Registro()}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

