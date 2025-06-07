import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { screens } from '../../firebase/config'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function loginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  function login() {
    signInWithEmailAndPassword(screens, usuario, contrasena)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        navigation.navigate('Drawer'); // Navegar a la pantalla Drawer
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      });
  }


  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Inicia Sesión</Text>
        <TextInput
          placeholder='Correo'
          style={styles.input}

          onChangeText={(texto) => setUsuario(texto)}
          value={usuario}
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
        <TouchableOpacity
          style={[styles.button, styles.buttonIngresar]}
          onPress={() => login()}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}