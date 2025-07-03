import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

const backgroundImage = require('../imagenes/fondonuves.jpg') // Fondo
const logo = require('../imagenes/logo game.png') // Logo

export default function LoginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false)
  const [emailRecuperacion, setEmailRecuperacion] = useState('')

  async function Login() {
    signInWithEmailAndPassword(auth, usuario, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer');
      })
      .catch((error) => {
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      });
  }

  function Restablecer() {
    if (!emailRecuperacion) {
      Alert.alert("Error", "Ingresa tu correo electrónico");
      return;
    }
    
    sendPasswordResetEmail(auth, emailRecuperacion)
      .then(() => {
        Alert.alert("Éxito", "Se ha enviado un enlace de recuperación a tu correo");
        setMostrarRecuperacion(false);
        setEmailRecuperacion('');
      })
      .catch((error) => {
        Alert.alert("Error", "No se pudo enviar el correo de recuperación");
      });
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Inicia Sesión</Text>
        
        {!mostrarRecuperacion ? (
          <>
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
              onPress={() => Login()}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMostrarRecuperacion(true)}
            >
              <Text style={[styles.buttonText, { color: '#FFD700', marginTop: 15 }]}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.title, { fontSize: 20 }]}>Recuperar Contraseña</Text>
            <TextInput
              placeholder='Correo para recuperación'
              style={styles.input}
              onChangeText={(texto) => setEmailRecuperacion(texto)}
              value={emailRecuperacion}
              placeholderTextColor="black"
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonRegistro]}
              onPress={() => Restablecer()}
            >
              <Text style={styles.buttonText}>Enviar enlace</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMostrarRecuperacion(false)}
            >
              <Text style={[styles.buttonText, { color: '#FFD700', marginTop: 15 }]}>
                Volver al login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      </ImageBackground>
  )
}