import { supabase } from '../supabase/config'

export async function subirImagen(imageUri: string, userId: string) {
  try {
    const fileName = `${userId}_avatar.jpg`
    
    console.log('🔄 Procesando imagen:', imageUri.substring(0, 50) + '...')
    
    // ✅ MÉTODO SIMPLIFICADO - Sin carpeta public/
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, {  // ✅ SIN public/
        uri: imageUri,
        name: fileName
      } as any, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('❌ Error subiendo imagen:', error)
      console.error('❌ Error details:', JSON.stringify(error, null, 2))
      return null
    }

    console.log('✅ Imagen subida exitosamente:', data)

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)  // ✅ SIN public/

    console.log('📸 URL generada:', urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error('❌ Error completo:', error)
    return null
  }
}