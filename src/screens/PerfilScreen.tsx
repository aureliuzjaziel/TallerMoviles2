import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function PerfilScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button title="Abrir menú" onPress={() => navigation.openDrawer()} />
      <Text style={styles.title}>PerfilScreen</Text>
      {/* Aquí puedes agregar más información del perfil */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20
  }
})