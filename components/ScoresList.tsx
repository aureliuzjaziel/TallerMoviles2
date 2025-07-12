import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import { getTopScores, UserScore } from '../services/scoreService'

export default function ScoresList() {
  const [scores, setScores] = useState<UserScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScores()
  }, [])

  const loadScores = async () => {
    try {
      const topScores = await getTopScores(10)
      setScores(topScores)
    } catch (error) {
      console.error('Error cargando scores:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderScore = ({ item, index }: { item: UserScore; index: number }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.position}>#{index + 1}</Text>
      
      {/* Avatar del usuario */}
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
        <Text style={styles.scoreText}>{item.score} puntos</Text>
      </View>
      
      <Text style={styles.date}>
        {new Date(item.created_at || '').toLocaleDateString()}
      </Text>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando scores...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Mejores Puntuaciones</Text>
      <FlatList
        data={scores}
        renderItem={renderScore}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    color: '#666'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  defaultAvatar: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  scoreText: {
    fontSize: 14,
    color: '#666'
  },
  date: {
    fontSize: 12,
    color: '#999'
  }
})