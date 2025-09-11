import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { styles as globalStyles, COLORS } from '../styles/styles';

export default function ProfileScreen({ user, setUser }) {

  const handleLogout = () => {
    console.log('Usuário deslogado.');
    setUser(null);
    // O AppNavigator irá automaticamente renderizar as telas de login
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.profileContainer}>
        <Text style={globalStyles.title}>Perfil</Text>
        <Text style={styles.emailText}>
          Logado como: <Text style={styles.email}>{user.email}</Text>
        </Text>
        <Button title="Sair" onPress={handleLogout} color={COLORS.secondary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    width: '80%',
  },
  emailText: {
    fontSize: 18,
    marginVertical: 20,
  },
  email: {
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});