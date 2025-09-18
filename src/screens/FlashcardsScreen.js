import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native"; // Adicionado TouchableOpacity e StyleSheet
import * as Speech from "expo-speech"; // NOVO: Importa a biblioteca de fala aqui
import { Feather } from "@expo/vector-icons"; // Importa os ícones

import { styles as globalStyles, COLORS } from "../styles/styles"; // Renomeado para evitar conflito
import words from "../data/words";
import Card from "../components/Card";

export default function FlashcardsScreen({
  navigation,
  user,
  favorites,
  addFavorite,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];

  const handleSwipeRight = () =>
    setCurrentIndex((prev) => (prev + 1) % words.length);
  const handleSwipeLeft = () =>
    setCurrentIndex((prev) => (prev === 0 ? words.length - 1 : prev - 1));

  const handleLongPress = (word) => {
    if (!user) {
      Alert.alert(
        "Acesso Negado",
        "Você precisa fazer login para salvar palavras nos favoritos.",
        [
          { text: "Fazer Login", onPress: () => navigation.navigate("Login") },
          { text: "Cancelar" },
        ]
      );
      return;
    }
    const isAlreadyFavorite = favorites.some((fav) => fav.en === word.en);
    if (!isAlreadyFavorite) {
      addFavorite(word, user.email);
      Alert.alert(
        "Favorito adicionado",
        `"${word.en}" foi salvo nos favoritos ⭐`
      );
    } else {
      Alert.alert("Já favoritado", `"${word.en}" já está nos favoritos.`);
    }
  };

  // NOVO: A função de áudio agora vive na tela principal.
  const speakWord = () => {
    // Verifica se existe uma palavra sendo exibida
    if (currentWord) {
      Speech.speak(currentWord.en, { language: "en-US" });
    }
  };

  // Extrai o nome do usuário do e-mail para uma saudação mais amigável
  const getUsername = () => {
    if (user?.email) {
      const name = user.email.split("@")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "";
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Cabeçalho com saudação e botão de perfil */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            Olá, {user ? getUsername() : "Visitante"}!
          </Text>
          <Text style={styles.headerSubtitle}>Pronto para aprender?</Text>
        </View>
        {user && (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Feather name="user" size={26} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {currentWord && (
        <Card
          key={currentIndex}
          word={currentWord}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onLongPress={handleLongPress}
        />
      )}

      <TouchableOpacity style={styles.speakButton} onPress={speakWord}>
        <Feather name="volume-2" size={24} color={COLORS.white} />
        <Text style={styles.speakButtonText}>Ouvir Pronúncia</Text>
      </TouchableOpacity>

      {/* Botões de Ação na parte inferior */}
      <View style={styles.footer}>
        {user ? (
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => navigation.navigate("Favorites")}
          >
            <Feather name="star" size={24} color={COLORS.white} />
            <Text style={styles.mainActionButtonText}>Meus Favoritos</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-in" size={24} color={COLORS.white} />
            <Text style={styles.mainActionButtonText}>Login / Cadastrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// Estilos específicos para esta tela
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.textLight,
  },
  profileButton: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
  speakButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardBack,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 10,
  },
  speakButtonText: {
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  mainActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 50,
    width: "100%",
  },
  mainActionButtonText: {
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginLeft: 10,
  },
});
