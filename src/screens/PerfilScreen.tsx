import {StyleSheet , Text, View, ImageBackground, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
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
          // 2. ✅ NUEVO: Obtener datos de la tabla usuarios
          const { data: userData, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (error) {
            console.error('Error obteniendo datos de usuarios:', error)
            // Fallback a metadata si no existe en tabla
            setUserData({
              email: user.email,
              nick: user.user_metadata?.nick || 'Sin nick',
              edad: user.user_metadata?.edad || 'No definida',
              avatar_url: user.user_metadata?.avatar_url || null
            })
          } else {
            // ✅ Usar datos de la tabla usuarios
            setUserData({
              email: user.email,
              nick: userData.nick,
              edad: userData.edad,
              avatar_url: userData.avatar_url
            })
          }
        }
      } catch (error) {
        console.error('Error obteniendo datos del usuario:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const cerrarSesion = async () => {
    try {
      await supabase.auth.signOut()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
      Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente')
    } catch (error) {
      console.error('Error cerrando sesión:', error)
      Alert.alert('Error', 'No se pudo cerrar la sesión')
    }
  }

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
        <Text style={styles.title}>MI PERFIL</Text>
        
        {userData ? (
          <View style={Styles.profileContainer}>
            {/* Avatar del usuario */}
            <View style={Styles.avatarContainer}>
              {userData.avatar_url ? (
                <Image 
                  source={{ uri: userData.avatar_url }} 
                  style={Styles.avatarImage}
                />
              ) : (
                <View style={Styles.defaultAvatar}>
                  <Text style={Styles.avatarText}>
                    {userData.nick?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </View>

            {/* Información del usuario */}
            <View style={Styles.profileInfoContainer}>
              <View style={Styles.infoRow}>
                <Text style={Styles.infoLabel}>Nick:</Text>
                <Text style={Styles.infoValue}>{userData.nick}</Text>
              </View>
              
              <View style={Styles.infoRow}>
                <Text style={Styles.infoLabel}>Email:</Text>
                <Text style={Styles.infoValue}>{userData.email}</Text>
              </View>
              
              <View style={Styles.infoRow}>
                <Text style={Styles.infoLabel}>Edad:</Text>
                <Text style={Styles.infoValue}>{userData.edad}</Text>
              </View>
            </View>

            {/* Botones de acción */}
            <View style={Styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonIngresar]}
                onPress={() => navigation.openDrawer()}
              >
                <Text style={styles.buttonText}>Abrir Menú</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DC3545', marginTop: 10 }]}
                onPress={cerrarSesion}
              >
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={Styles.noDataText}>No se encontraron datos del usuario</Text>
        )}
      </View>
    </ImageBackground>
  )
}

const Styles = StyleSheet.create({
  profileContainer: {
    width: '90%',
    alignItems: 'center',
    
    paddingBottom: 20
  },
  avatarContainer: {
    
    alignItems: 'center'
  },
  avatarImage: {
    width: 100, // ✅ REDUCIR de 120 a 100
    height: 100, // ✅ REDUCIR de 120 a 100
    borderRadius: 50, // ✅ AJUSTAR radius
    borderWidth: 3,
    marginBottom: 30,
    borderColor: '#FFD700'
  },
  defaultAvatar: {
    width: 100, // ✅ REDUCIR de 120 a 100
    height: 100, // ✅ REDUCIR de 120 a 100
    borderRadius: 50, // ✅ AJUSTAR radius
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700'
  },
  avatarText: {
    color: 'white',
    fontSize: 32, // ✅ REDUCIR de 40 a 32
    fontWeight: 'bold'
  },
  profileInfoContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // ✅ CAMBIAR a fondo oscuro para mejor contraste
    borderRadius: 15,
    padding: 20,
    marginBottom: 20, // ✅ REDUCIR de 30 a 20
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)' // ✅ AGREGAR borde dorado sutil
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, // ✅ REDUCIR de 15 a 12
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.3)', // ✅ CAMBIAR a dorado
    paddingBottom: 8 // ✅ REDUCIR de 10 a 8
  },
  infoLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoValue: {
    color: '#FFFFFF', // ✅ ASEGURAR color blanco puro
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    fontWeight: '500', // ✅ AGREGAR peso para mejor visibilidad
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // ✅ AGREGAR sombra al texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10 // ✅ AGREGAR margen superior pequeño
  },
  noDataText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // ✅ AGREGAR sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
})