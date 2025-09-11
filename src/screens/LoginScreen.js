import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { styles as globalStyles, COLORS } from '../styles/styles';

// NOVO: Nossa "base de dados" de usuários autorizados.
// No futuro, isso poderia vir de uma API ou banco de dados.
const authorizedUsers = [
  { email: 'andre@andre.com', password: 'andre' },
  { email: 'denise@denise.com', password: 'denise' },
  { email: 'kennedy@kennedy.com', password: 'kennedy' },
];

export default function LoginScreen({ navigation, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ALTERADO: A função de login agora tem uma lógica de validação.
  const handleLogin = () => {
    // 1. Validação básica para campos vazios (continua igual)
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    // 2. Procuramos pelo usuário na nossa lista de autorizados.
    // Usamos toLowerCase() no e-mail para não diferenciar maiúsculas/minúsculas.
    const foundUser = authorizedUsers.find(
      user => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password.trim()
    );

    // 3. Verificamos se o usuário foi encontrado.
    if (foundUser) {
      // Se encontrou, o login é bem-sucedido!
      console.log(`Login bem-sucedido para o usuário: ${foundUser.email}`);
      setUser({ email: foundUser.email });
    } else {
      // Se não encontrou, negamos o acesso.
      Alert.alert('Acesso Negado', 'E-mail ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Área VIP</Text>
      <View style={styles.formContainer}>

        {/* NOVO: Aviso na tela de login para testes. */}
        <Text style={styles.testInfo}>
          Atenção! Use o e-mail kennedy@kennedy.com e senha kennedy para acessar.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Entrar" onPress={handleLogin} color={COLORS.primary} />
      </View>
    </SafeAreaView>
  );
}

// Estilos (adicionei um estilo para o texto de aviso)
const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  // NOVO: Estilo para o texto de aviso
  testInfo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});