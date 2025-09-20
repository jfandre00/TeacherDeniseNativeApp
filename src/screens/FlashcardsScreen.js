import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Speech from "expo-speech";
import { Feather } from "@expo/vector-icons";

import { styles as globalStyles, COLORS } from "../styles/styles";
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

  // NOVO: Lógica para calcular as métricas do dashboard
  const totalWordsCount = words.length;
  const savedCount = favorites ? favorites.length : 0;
  const percentage =
    totalWordsCount > 0
      ? Math.round((savedCount / totalWordsCount) * 100)
      : 0;

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

  const speakWord = () => {
    if (currentWord) {
      Speech.speak(currentWord.en, { language: "en-US" });
    }
  };

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
          {user && (
            <Text style={styles.appTitle}>
              Teacher Denise's Flashcards v2.0
            </Text>
          )}
          <Text style={styles.headerTitle}>
            Olá, {user ? getUsername() : "Visitante"}!
          </Text>
          <Text style={styles.headerSubtitle}>
            {user ? "Pronto para aprender?" : "Welcome to Teacher Denise's Flashcards"}
          </Text>
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

      {/* NOVO: Card de Resumo, visível apenas para usuários logados */}
      {user && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Seu Progresso</Text>
          <Text style={styles.summaryText}>
            {savedCount} de {totalWordsCount} palavras salvas
          </Text>
          <Text style={styles.summaryPercentage}>
            Você já domina {percentage}% do vocabulário!
          </Text>
        </View>
      )}

      {/* Botão para o formulário, visível apenas para visitantes */}
      {!user && (
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate("InterestForm")}
        >
          <Text style={styles.ctaButtonText}>✨ Quero ser Aluno(a) VIP!</Text>
        </TouchableOpacity>
      )}

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
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  appTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 25,
    fontWeight: "600",
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
  // NOVO: Estilos para o Card de Resumo
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  summaryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
  },
  summaryPercentage: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 5,
  },
  ctaButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
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
    marginBottom: 20,
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