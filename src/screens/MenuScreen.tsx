import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles as globalStyles } from '../theme/estilos'

const backgroundImage = require('../imagenes/fondonuves.jpg')
const logo = require('../imagenes/logo game.png')

export default function MenuScreen({ navigation }: any) {
  const abrirMenu = () => {
    navigation.openDrawer()
  }

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.background} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <Image source={logo} style={globalStyles.logo} resizeMode="contain" />
        <Text style={globalStyles.title}>MENÚ PRINCIPAL</Text>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonIngresar, styles.menuButton]}
            onPress={abrirMenu}
          >
            <Text style={[globalStyles.buttonText, styles.menuButtonText]}>
              📱 ABRIR MENÚ
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.instructionText}>
            Toca el botón para acceder a todas las opciones del juego
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  menuButton: {
    minWidth: 200,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    transform: [{ scale: 1.1 }] // Botón ligeramente más grande
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    paddingHorizontal: 20
  }
})