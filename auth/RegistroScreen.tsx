import { Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../src/theme/estilos'
import { supabase } from '../supabase/config'
import * as ImagePicker from 'expo-image-picker'
import { subirImagen } from '../services/uploadService'

const backgroundImage = require('../src/imagenes/fondonuves.jpg')
const logo = require('../src/imagenes/logo game.png')

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState('')
  const [edad, setEdad] = useState('')
  const [nick, setNick] = useState('')
  const [imagen, setImagen] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      console.log('📸 Imagen seleccionada:', result.assets[0].uri)
    }
  };

  async function registro() {
    // VALIDACIONES SIN CÉDULA
    if (!correo || !contrasenia || !confirmacionContrasenia || !edad || !nick) {
      Alert.alert("Error", "Todos los campos son obligatorios")
      return
    }

    if (contrasenia !== confirmacionContrasenia) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      // 1. Crear usuario en auth
      const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: contrasenia,
      })

      if (error) throw error

      // 2. Subir imagen si existe
      let urlImagen = null
      if (imagen && data.user) {
        urlImagen = await subirImagen(imagen, data.user.id)
      }

      // 3. ✅ NUEVO: Guardar en tabla usuarios
      if (data.user) {
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert([
            {
              id: data.user.id,
              nick: nick,
              edad: parseInt(edad),
              avatar_url: urlImagen
            }
          ])

        if (insertError) {
          console.error('Error guardando usuario:', insertError)
          Alert.alert('Error', 'No se pudieron guardar los datos del usuario')
          return
        }

        // 4. ✅ TAMBIÉN guardar en metadata para compatibilidad
        await supabase.auth.updateUser({
          data: {
            nick: nick,
            edad: parseInt(edad),
            avatar_url: urlImagen
          }
        })
      }

      Alert.alert("Éxito", "Usuario registrado exitosamente. Revisa tu email para confirmar.")
      navigation.navigate('Login')
      
    } catch (error: any) {
      console.error('Error completo:', error)
      Alert.alert("Error", error.message || "Error al crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        {/* ✅ CONTENEDOR CON SCROLL QUE INCLUYE EL LOGO */}
        <ScrollView 
          contentContainerStyle={{ 
            alignItems: 'center', 
            paddingTop: 40, // ✅ AGREGAR padding top para bajar el logo
            paddingBottom: 30,
            width: '100%'
          }}
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {/* ✅ LOGO DENTRO DEL SCROLL */}
          <Image source={logo} style={[styles.logo, { width: 80, height: 80, marginBottom: 15 }]} resizeMode="contain" />
          
          {/* ✅ PREVIEW DE IMAGEN MÁS PEQUEÑO */}
          {imagen && (
            <Image 
              source={{ uri: imagen }} 
              style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                marginBottom: 10,
                borderWidth: 2,
                borderColor: '#FFD700'
              }}
            />
          )}
          
          {/* ✅ BOTÓN DE FOTO MÁS COMPACTO */}
          <TouchableOpacity
            style={[
              styles.button, 
              { 
                backgroundColor: '#4CAF50', 
                marginBottom: 15,
                paddingVertical: 12,
                width: 200
              }
            ]}
            onPress={seleccionarImagen}
          >
            <Text style={[styles.buttonText, { fontSize: 16 }]}>
              {imagen ? 'Cambiar Foto' : 'Seleccionar Foto'}
            </Text>
          </TouchableOpacity>
          
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
            placeholder='Nick/Nombre de Usuario'
            style={styles.input}
            onChangeText={setNick}
            value={nick}
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
            placeholder='Edad'
            style={styles.input}
            onChangeText={setEdad}
            value={edad}
            keyboardType="numeric"
            placeholderTextColor="black"
          />

          {/* ✅ BOTÓN REGISTRARME MÁS ANCHO */}
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.buttonRegistro,
              { 
                marginTop: 15,
                paddingVertical: 15,
                width: 250, // ✅ AUMENTAR de 200 a 250
                paddingHorizontal: 20 // ✅ AGREGAR padding horizontal
              }
            ]}
            onPress={registro}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { fontSize: 16 }]}>
              {loading ? 'CREANDO...' : 'REGISTRARME'}
            </Text>
          </TouchableOpacity>

          {/* ✅ BOTÓN YA TIENES CUENTA MÁS ANCHO */}
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.buttonIngresar,
              { 
                marginTop: 10,
                paddingVertical: 12,
                width: 250, // ✅ AUMENTAR de 200 a 250
                paddingHorizontal: 15 // ✅ AGREGAR padding horizontal
              }
            ]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, { fontSize: 14 }]}>
              ¿Ya tienes cuenta? Inicia Sesión
            </Text>
          </TouchableOpacity>
          
        </ScrollView>
      </View>
    </ImageBackground>
  )
}