import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

export default function loginScreen() {
   const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
 

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Inicia Secion</Text>
      <TextInput
        placeholder='Usuario'
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder='contrasena'
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />
      
      <Button
        title='ingresar'
        
      />



    </View>
  )
}