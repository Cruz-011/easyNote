import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obterAlunos } from '../storage/alunoStorage';

export default function AlunosScreen() {
  const [alunos, setAlunos] = useState<string[]>([]);

  useEffect(() => {
    obterAlunos().then(setAlunos);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todos os Alunos</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.aluno}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  titulo: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  aluno: { fontSize: 16, padding: 10, borderBottomWidth: 1 }
});
