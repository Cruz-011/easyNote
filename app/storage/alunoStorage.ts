import AsyncStorage from '@react-native-async-storage/async-storage';

export async function salvarAluno(resultado: string) {
  const alunos = await obterAlunos();
  alunos.push(resultado);
  await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
}

export async function obterAlunos(): Promise<string[]> {
  const dados = await AsyncStorage.getItem('alunos');
  return dados ? JSON.parse(dados) : [];
}
