import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { salvarAluno } from '../storage/alunoStorage';

export default function HomeScreen({ navigation }: any) {
  const [emNota1, setemNota1] = useState('');
  const [emNota2, setemNota2] = useState('');
  const [emNota3, setemNota3] = useState('');
  const [emFaltas, setemFaltas] = useState('');
  const [emResultado, setemResultado] = useState('');

  const LIMITE_FALTAS = 15;

  function emValidarNotas() {
    let n1 = parseFloat(emNota1) || 0;
    let n2 = parseFloat(emNota2) || 0;
    let n3 = parseFloat(emNota3) || 0;
    let faltas = parseInt(emFaltas) || 0;

    if (faltas > LIMITE_FALTAS) {
      setemResultado('Reprovado por falta');
      salvarAluno('Reprovado por falta');
      return;
    }

    let notas = [n1, n2, n3].sort((a, b) => b - a);
    let media = ((notas[0] + notas[1]) / 2).toFixed(2);

    if (parseFloat(media) >= 7) {
      setemResultado(`Aprovado com média de ${media}`);
      salvarAluno(`Aprovado com média de ${media}`);
    } else if (parseFloat(media) >= 5) {
      setemResultado(`Exame com média de ${media}`);
      salvarAluno(`Exame com média de ${media}`);
    } else {
      setemResultado(`Reprovado por nota (média de ${media})`);
      salvarAluno(`Reprovado por nota (média de ${media})`);
    }
  }

  function emResetar() {
    setemNota1('');
    setemNota2('');
    setemNota3('');
    setemFaltas('');
    setemResultado('');
  }

  function emSair() {
    navigation.replace('Login');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={emResetar}>
        <Image source={require('../../assets/images/fiap.png')} style={styles.logo} />
      </TouchableOpacity>

      <TextInput keyboardType="decimal-pad" value={emNota1} onChangeText={setemNota1} placeholder="Nota 1" style={styles.input} />
      <TextInput keyboardType="decimal-pad" value={emNota2} onChangeText={setemNota2} placeholder="Nota 2" style={styles.input} />
      <TextInput keyboardType="decimal-pad" value={emNota3} onChangeText={setemNota3} placeholder="Nota 3" style={styles.input} />
      <TextInput keyboardType="number-pad" value={emFaltas} onChangeText={setemFaltas} placeholder="Faltas" style={styles.input} />

      <Button title="Validar" onPress={emValidarNotas} />
      <Text style={styles.resultado}>{emResultado}</Text>

      <Button title="Ver Todos os Alunos" onPress={() => navigation.navigate('Alunos')} />

      <View style={{ marginTop: 20 }}>
        <Button title="Sair" onPress={emSair} color="#D6001C" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20, backgroundColor: '#0f0f0f', flexGrow: 1 },
  input: { borderWidth: 1, borderColor: '#444', backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 8, width: '80%', padding: 8, marginBottom: 10 },
  logo: { width: 150, height: 50, resizeMode: 'contain', marginBottom: 20 },
  resultado: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
