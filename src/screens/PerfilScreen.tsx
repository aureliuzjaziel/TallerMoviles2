import {StyleSheet , Text, View, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../theme/estilos'
import { supabase } from '../../supabase/config'


const backgroundImage = require('../imagenes/fondonuves.jpg')
const logo = require('../imagenes/logo game.png')

export default function PerfilScreen({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Obtener el usuario autenticado
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // 2. Obtener los datos adicionales de la tabla 'usuarios'
          const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (error) throw error
          
          // Combinar datos de auth y datos adicionales
          setUserData({
            email: user.email,
            ...data
          })
        }
      } catch (error) {
        console.error('Error obteniendo datos del usuario:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
        <View style={[styles.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{ color: 'white', marginTop: 10 }}>Cargando perfil...</Text>
        </View>
      </ImageBackground>
    )
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>BIENVENIDO</Text>
        
        
        {userData ? (
          <View style={Styles.profileInfoContainer}>
            <View style={Styles.infoRow}>
              <Text style={Styles.infoLabel}>Email:</Text>
              <Text style={Styles.infoValue}>{userData.email}</Text>
            </View>
            
            <View style={Styles.infoRow}>
              <Text style={Styles.infoLabel}>Cédula:</Text>
              <Text style={Styles.infoValue}>{userData.cedula}</Text>
            </View>
            
            <View style={Styles.infoRow}>
              <Text style={Styles.infoLabel}>Edad:</Text>
              <Text style={Styles.infoValue}>{userData.edad}</Text>
            </View>
          </View>
        ) : (
          <Text style={Styles.noDataText}>No se encontraron datos del usuario</Text>
        )}

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

// Agrega estos estilos a tu archivo estilos.js
const Styles = StyleSheet.create({
  profileInfoContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    paddingBottom: 10
  },
  infoLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoValue: {
    color: 'white',
    fontSize: 16
  },
  noDataText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center'
  }
})