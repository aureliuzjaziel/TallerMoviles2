import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

const backgroundImage = require('../src/imagenes/fondonuves.jpg') // Make sure to add this image
const logo = require('../src/imagenes/logo game.png') // Make sure to add this image

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState("")
  const [cedula, setCedula] = useState("")
  const [edad, setEdad] = useState("")
  const [loading, setLoading] = useState(false)

  async function registro() {
    if (contrasenia !== confirmacionContrasenia) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    if (!cedula || !edad) {
      Alert.alert("Error", "Por favor complete todos los campos")
      return
    }

    setLoading(true)
    
    try {
      // 1. Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: correo,
        password: contrasenia,
      })

      if (authError) {
        throw authError
      }

      // 2. If registration successful, store additional data in a table
      const { data: profileData, error: profileError } = await supabase
        .from('usuarios') // Make sure this table exists in your Supabase
        .insert([
          { 
            id: authData.user?.id,
            email: correo,
            cedula: cedula,
            edad: parseInt(edad)
          }
        ])

      if (profileError) {
        throw profileError
      }

      Alert.alert("Éxito", "Registro completado. Por favor verifica tu email.")
      navigation.navigate("Login")
    } catch (error) {
      Alert.alert("Error","Registro fallido" )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        
        <Text style={styles.title}>Crear Cuenta</Text>
        
        <TextInput
          placeholder='Ingresar email'
          style={styles.input}
          onChangeText={setcorreo}
          value={correo}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="black"
        />

        <TextInput
          placeholder='Ingresar contraseña'
          style={styles.input}
          onChangeText={setcontrasenia}
          value={contrasenia}
          secureTextEntry={true}
          placeholderTextColor="black"
        />

        <TextInput
          placeholder='Confirmar contraseña'
          style={styles.input}
          onChangeText={setConfirmacionContrasenia}
          value={confirmacionContrasenia}
          secureTextEntry={true}
          placeholderTextColor="black"
        />

        <TextInput
          placeholder='Cédula'
          style={styles.input}
          onChangeText={setCedula}
          value={cedula}
          keyboardType="numeric"
          placeholderTextColor="black"
        />

        <TextInput
          placeholder='Edad'
          style={styles.input}
          onChangeText={setEdad}
          value={edad}
          keyboardType="numeric"
          placeholderTextColor="black"
        />

        <TouchableOpacity 
          style={[styles.button, styles.buttonRegistro]}
          onPress={registro}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'CREANDO CUENTA...' : 'REGISTRARME'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
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