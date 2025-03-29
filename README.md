# easyNote 📚
 
Aplicativo desenvolvido em **React Native** para facilitar o registro e validação de notas e faltas de alunos, baseado nas regras acadêmicas da FIAP.
 
---
 
## 📱 Funcionalidades
 
- Inserção de 3 notas e número de faltas
- Cálculo automático da média (descartando a menor nota)
- Avaliação da situação do aluno:
  - ✅ Aprovado
  - 🟡 Exame
  - ❌ Reprovado por nota ou falta
- Armazenamento local da situação do aluno (por RM)
- Visualização de todos os alunos já validados
- Seleção da turma (ex: 2TDSPK, 2TDSPJ, etc)
- Layout dark moderno e responsivo
- Sistema de login fictício (qualquer valor acessa)
 
---
 
## 🧪 Tecnologias Utilizadas
 
- React Native (via Expo)
- TypeScript
- AsyncStorage para armazenamento local
- Navegação com React Navigation
 
---
 
## 🧭 Estrutura do Projeto
 
```bash
easyNote/
├── app/
│   ├── screens/        # Telas (Login, Home, Alunos)
│   ├── navigation/     # Stack Navigator
│   ├── storage/        # AsyncStorage do aluno
├── assets/images/      # Logo FIAP
├── components/         # Componentes reutilizáveis (opcional)
├── README.md