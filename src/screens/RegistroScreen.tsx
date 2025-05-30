import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

export default function RegistroScreen() {


  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Registrase</Text>
      <TextInput
        placeholder='Usuario'
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder='correo'
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />
      <TextInput
        placeholder='contraseña'
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />
      <TextInput
        placeholder='repetir contraseña'
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />
        <TextInput
        placeholder='numero'
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />
      

      <Button
        title='ingistrar'



      />



    </View>
  )
}

