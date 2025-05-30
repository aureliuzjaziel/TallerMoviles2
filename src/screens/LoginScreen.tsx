import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

export default function loginScreen() {
   const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
 

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Guardar</Text>
       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Eliminar</Text>
      <TextInput
        placeholder='Nombre'
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder='Apellido'
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      
      <Button
        title='Guardar'
        
      />



    </View>
  )
}





