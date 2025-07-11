import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

const backgroundImage = require('../src/imagenes/fondonuves.jpg') // You'll need to add this image
const logo = require('../src/imagenes/logo game.png') // You'll need to add this image

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasenia,
    })
    
    console.log(data)
    if(data.user == null){
      Alert.alert("Error", "Usuario o contraseña incorrectos")
    }else{
      navigation.navigate("Drawer")
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <TextInput
          placeholder='Ingresar email'
          style={styles.input}
          onChangeText={(texto) => setcorreo(texto)}
          value={correo}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="black"
        />

        <TextInput
          placeholder='Ingresar contraseña'
          style={styles.input}
          onChangeText={(texto) => setcontrasenia(texto)}
          value={contrasenia}
          secureTextEntry={true}
          placeholderTextColor="black"
        />

        <TouchableOpacity 
          style={[styles.button, styles.buttonRegistro]}
          onPress={() => login()}
        >
          <Text style={styles.buttonText}>INGRESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonRegistro: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
})