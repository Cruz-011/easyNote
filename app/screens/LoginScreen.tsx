import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
 
export default function LoginScreen({ navigation }: any) {
  const [emUsuario, setemUsuario] = useState('');
  const [emSenha, setemSenha] = useState('');
 
  function emLogar() {
    navigation.replace('easyNote');
  }
 
  return (
<KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
<StatusBar barStyle="light-content" backgroundColor="#000" />
<Image source={require('../../assets/images/fiap.png')} style={styles.logo} />
<Text style={styles.titulo}>easyNote</Text>
 
        <View style={styles.boxInputs}>
<TextInput
            placeholder="Usuário"
            placeholderTextColor="#aaa"
            onChangeText={setemUsuario}
            style={styles.input}
          />
<TextInput
            placeholder="Senha"
            placeholderTextColor="#aaa"
            onChangeText={setemSenha}
            secureTextEntry
            style={styles.input}
          />
 
          <TouchableOpacity onPress={emLogar} style={styles.botao}>
<Text style={styles.botaoTexto}>Entrar</Text>
</TouchableOpacity>
</View>
</ScrollView>
</KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  logo: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  boxInputs: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#D6001C',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});