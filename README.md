# English Flashcards App 🚀

Um aplicativo móvel (React Native + Expo) para ajudar no estudo de vocabulário em inglês, com funcionalidades exclusivas para os alunos da **Teacher Denise**. Desenvolvido como trabalho acadêmico para demonstrar conceitos de mobile, navegação, autenticação, gestos e persistência de dados.

📸 Demonstração (vídeo):  
https://photos.app.goo.gl/3EwKGvtB2s5jG14E9

---

## Sumário
- [Sobre o projeto](#sobre-o-projeto)  
- [Funcionalidades principais](#funcionalidades-principais)  
- [Tecnologias](#tecnologias)  
- [Pré-requisitos](#pré-requisitos)  
- [Instalação e execução](#instalação-e-execução)  
- [Estrutura do projeto](#estrutura-do-projeto)  
- [Persistência e autenticação](#persistência-e-autenticação)
  
---

## Sobre o projeto
O **English Flashcards App** possui duas áreas principais para engajar usuários gerais e alunos assinantes da Teacher Denise:

- **Área Pública**: amostra do app para qualquer usuário (flashcards interativos).
- **Área VIP**: área protegida por login para alunos autorizados, com recursos adicionais (favoritos por usuário, áudio de pronúncia, notas pessoais etc).

Foi pensado para ser leve, responsivo e com gestos nativos para uma experiência fluida de estudo.

---

## Funcionalidades principais

### Área Pública
- Baralho de flashcards com palavras em inglês.
- Virar o card com toque para ver tradução.
- Deslizar para navegar entre cards.

### Área VIP (Alunos)
- Login com credenciais pré-definidas (acesso restrito).
- Favoritos por usuário (lista privada e persistente).
- Reproduzir pronúncia (Expo Speech / Text-to-Speech).
- CRUD completo sobre favoritos:
  - **Create** — salvar novas palavras.
  - **Read** — consultar lista de favoritos.
  - **Update** — editar notas pessoais associadas a cada palavra.
  - **Delete** — remover palavras já dominadas.
- Sessão persistente (permanece logado no dispositivo).

### Outras
- Gestos nativos com `react-native-gesture-handler` e animações com `react-native-reanimated`.
- Persistência local usando `@react-native-async-storage/async-storage`.

---

## Tecnologias
- **React Native**  
- **Expo** (Expo Go para testes em dispositivo)  
- **React Navigation**  
- **React Native Gesture Handler**  
- **React Native Reanimated**  
- **Expo Speech** (Text-to-Speech)  
- **AsyncStorage** (persistência local)  
- JavaScript / TypeScript (conforme implementação)

---

## Pré-requisitos
- Node.js (recomendado: **v18.18.0**) — verifique com `node -v`  
- Git  
- Expo CLI (opcional globalmente): `npm install -g expo-cli`  
- Um dispositivo físico com **Expo Go** instalado (Android / iOS) ou um emulador/simulador configurado (Android Studio / Xcode)

---

## Instalação e execução

1. Clone o repositório (substitua pelo seu repo):
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale dependências:
```bash
npm install
# ou
yarn
```

3. Inicie o servidor do Expo:
```bash
npx expo start
```

4. Abra o app:
- No celular: abra o **Expo Go** e escaneie o QR Code exibido no terminal/na página do Metro.
- Em emulador:
  - Pressione `a` no terminal para Android.
  - Pressione `i` no terminal para iOS.

---

## Estrutura do projeto
```
src/
├── components/   # Componentes reutilizáveis (ex: Card.js)
├── data/         # Dados estáticos (ex: words.js)
├── navigation/   # Navegação (AppNavigator.js)
├── screens/      # Telas principais do app
└── styles/       # Estilos globais / tema
```

---

## Persistência e autenticação
- **Persistência**: o app usa `AsyncStorage` para:
  - Manter sessão do usuário (permanece logado).
  - Salvar listas de favoritos por usuário.
  - Guardar notas pessoais associadas a cada palavra.
- **Autenticação**: sistema simples de login com credenciais pré-definidas (útil para projeto acadêmico). Você pode adaptar para Firebase/Auth real no futuro.

> Dica: para produção, substitua armazenamento local por um backend (ex.: Firebase, REST API) e implemente autenticação segura.

---


