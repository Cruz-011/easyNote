import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { salvarAluno } from '../storage/alunoStorage';
 
export default function HomeScreen({ navigation }: any) {
  const [emNota1, setemNota1] = useState('');
  const [emNota2, setemNota2] = useState('');
  const [emNota3, setemNota3] = useState('');
  const [emFaltas, setemFaltas] = useState('');
  const [emResultado, setemResultado] = useState('');
  const [emTurma, setemTurma] = useState('2TDSPK');
  const [emRM, setemRM] = useState('');
  const [exibirMenu, setExibirMenu] = useState(false);
 
  const LIMITE_FALTAS = 15;
 
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
 
  function emValidarNotas() {
    let n1 = parseFloat(emNota1) || 0;
    let n2 = parseFloat(emNota2) || 0;
    let n3 = parseFloat(emNota3) || 0;
    let faltas = parseInt(emFaltas) || 0;
 
    if (faltas > LIMITE_FALTAS) {
      setemResultado('Reprovado por falta');
      salvarAluno(`RM ${emRM} - Reprovado por falta`);
      return;
    }
 
    let notas = [n1, n2, n3].sort((a, b) => b - a);
    let media = ((notas[0] + notas[1]) / 2).toFixed(2);
 
    if (parseFloat(media) >= 7) {
      setemResultado(`Aprovado com média de ${media}`);
      salvarAluno(`RM ${emRM} - Aprovado com média de ${media}`);
    } else if (parseFloat(media) >= 5) {
      setemResultado(`Exame com média de ${media}`);
      salvarAluno(`RM ${emRM} - Exame com média de ${media}`);
    } else {
      setemResultado(`Reprovado por nota (média de ${media})`);
      salvarAluno(`RM ${emRM} - Reprovado por nota (média de ${media})`);
    }
  }
 
  function emResetar() {
    setemNota1('');
    setemNota2('');
    setemNota3('');
    setemFaltas('');
    setemRM('');
    setemResultado('');
  }
 
  function emSair() {
    navigation.replace('Login');
  }
 
  return (
<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
<StatusBar backgroundColor="#141414" barStyle="light-content" />
 
        <View style={styles.navbar}>
<Image source={require('../../assets/images/fiap.png')} style={styles.logoPequeno} />
<Text style={styles.navTitle}>EasyNote</Text>
</View>
 
        <Text style={styles.label}>Selecione a turma:</Text>
<TouchableOpacity onPress={() => setExibirMenu(!exibirMenu)} style={styles.selectorButton}>
<Text style={styles.selectorButtonText}>{emTurma} ▼</Text>
</TouchableOpacity>
 
        {exibirMenu && (
<View style={styles.menuLista}>
            {['2TDSPK', '2TDSJK', '2TDSPJ'].map((turma) => (
<TouchableOpacity key={turma} onPress={() => { setemTurma(turma); setExibirMenu(false); }} style={styles.menuItem}>
<Text style={styles.menuItemText}>{turma}</Text>
</TouchableOpacity>
            ))}
</View>
        )}
 
        <TextInput keyboardType="decimal-pad" value={emNota1} onChangeText={setemNota1} placeholder="Nota 1" style={styles.input} />
<TextInput keyboardType="decimal-pad" value={emNota2} onChangeText={setemNota2} placeholder="Nota 2" style={styles.input} />
<TextInput keyboardType="decimal-pad" value={emNota3} onChangeText={setemNota3} placeholder="Nota 3" style={styles.input} />
<TextInput keyboardType="number-pad" value={emFaltas} onChangeText={setemFaltas} placeholder="Faltas" style={styles.input} />
<TextInput keyboardType="number-pad" value={emRM} onChangeText={setemRM} placeholder="RM do Aluno" style={styles.input} />
 
        <TouchableOpacity onPress={emValidarNotas} style={styles.btnPrimario}>
<Text style={styles.btnTexto}>VALIDAR</Text>
</TouchableOpacity>
 
        <Text style={styles.resultado}>{emResultado}</Text>
 
        <TouchableOpacity onPress={() => navigation.navigate('Alunos')} style={styles.btnSecundario}>
<Text style={styles.btnTexto}>VER TODOS OS ALUNOS</Text>
</TouchableOpacity>
 
        <TouchableOpacity onPress={emSair} style={styles.btnSair}>
<Text style={styles.btnTexto}>SAIR</Text>
</TouchableOpacity>
</ScrollView>
</KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141414',
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    width: '85%',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  logoPequeno: {
    width: 100,
    height: 90,
    resizeMode: 'contain',
    marginRight: 10,
  },
  navTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  label: {
    color: '#ccc',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  selectorButton: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '85%',
    marginBottom: 10,
  },
  selectorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuLista: {
    backgroundColor: '#1e1e1e',
    width: '85%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    color: '#fff',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnPrimario: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  btnSecundario: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  btnSair: {
    backgroundColor: '#D6001C',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});