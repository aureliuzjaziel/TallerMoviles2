import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles as globalStyles } from '../theme/estilos'
import { getTopScores, UserScore } from '../../services/scoreService' // ← Cambio: usar getTopScores en lugar de getAllScores

const backgroundImage = require('../imagenes/fondonuves.jpg')
const logo = require('../imagenes/logo game.png')

export default function ScoreScreen({ navigation }: any) {
  const [scores, setScores] = useState<UserScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScores()
  }, [])

  const loadScores = async () => {
    setLoading(true)
    try {
      const allScores = await getTopScores(20) // ← Cambio: usar getTopScores con límite
      setScores(allScores)
    } catch (error) {
      console.error('Error cargando puntuaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderScoreItem = ({ item, index }: { item: UserScore, index: number }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.position}>#{index + 1}</Text>
      
      {/* ← Agregar avatar */}
      {item.avatar_url ? (
        <Image 
          source={{ uri: item.avatar_url }} 
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatar, styles.defaultAvatar]}>
          <Text style={styles.avatarText}>
            {item.user_name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <Text style={styles.score}>{item.score} puntos</Text>
      </View>
      
      {/* ← Agregar fecha */}
      <Text style={styles.date}>
        {new Date(item.created_at || '').toLocaleDateString()}
      </Text>
    </View>
  )

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.background} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <Image source={logo} style={globalStyles.logo} resizeMode="contain" />
        <Text style={globalStyles.title}>🏆 Puntuaciones</Text>
        
        {loading ? (
          <Text style={globalStyles.title}>Cargando...</Text>
        ) : (
          <FlatList
            data={scores}
            renderItem={renderScoreItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()} 
            style={styles.scoresList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  scoresList: {
    width: '100%',
    marginTop: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // ✅ CAMBIAR a fondo más oscuro
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: 20,
    borderWidth: 1, // ✅ AGREGAR borde
    borderColor: 'rgba(255, 215, 0, 0.3)', // ✅ Borde dorado sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  position: {
    fontSize: 20, // ✅ AUMENTAR tamaño
    fontWeight: 'bold',
    color: '#FFD700',
    width: 40, // ✅ AUMENTAR ancho
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // ✅ AGREGAR sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  defaultAvatar: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // ✅ AGREGAR sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  userInfo: {
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    fontSize: 17, // ✅ AUMENTAR tamaño
    color: '#FFFFFF', // ✅ BLANCO puro
    fontWeight: '700', // ✅ MÁS bold
    marginBottom: 3, // ✅ MÁS espacio
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // ✅ AGREGAR sombra fuerte
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  score: {
    fontSize: 15, // ✅ AUMENTAR tamaño
    fontWeight: 'bold',
    color: '#32CD32', // ✅ Verde más brillante
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // ✅ AGREGAR sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  date: {
    fontSize: 12, // ✅ AUMENTAR un poco
    color: '#E0E0E0', // ✅ GRIS más claro
    width: 65, // ✅ MÁS ancho
    textAlign: 'right',
    fontWeight: '500', // ✅ AGREGAR peso
    textShadowColor: 'rgba(0, 0, 0, 0.6)', // ✅ AGREGAR sombra
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
})