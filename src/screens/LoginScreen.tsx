import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../theme/estilos'

<<<<<<< HEAD
export default function loginScreen({ navigation }: any) {
=======
export default function loginScreen() {
>>>>>>> 271ddd9ed3cab4c55b63db5b57977fea41dd83b4
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
<<<<<<< HEAD
        onPress={() => navigation.navigate('App')}
=======
>>>>>>> 271ddd9ed3cab4c55b63db5b57977fea41dd83b4
        
      />



    </View>
  )
}