import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles as globalStyles } from '../theme/estilos'
import { getAllScores, UserScore } from '../../services/scoreService'

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
      const allScores = await getAllScores()
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
      <Text style={styles.userName}>{item.user_name}</Text> 
      <Text style={styles.score}>{item.score} puntos</Text>
    </View>
  )

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.background} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <Image source={logo} style={globalStyles.logo} resizeMode="contain" />
        <Text style={globalStyles.title}>Puntuaciones</Text>
        
      

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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    width: 40,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32cd32',
  },
})