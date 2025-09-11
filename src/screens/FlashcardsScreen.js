import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native"; // Adicionado TouchableOpacity e StyleSheet
import * as Speech from "expo-speech"; // NOVO: Importa a biblioteca de fala aqui

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

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>English Flashcards</Text>
      <Text style={globalStyles.title2}>versão TP5</Text>
      <Text style={globalStyles.instructions}>
        Toque para tradução{"\n"}
        Arraste direita p/ próxima{"\n"}
        Arraste esquerda p/ anterior{"\n"}
        Segure 1s para Favoritar
      </Text>

      {currentWord && (
        <Card
          key={currentIndex}
          word={currentWord}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onLongPress={handleLongPress}
        />
      )}

      {/* NOVO: Botão de áudio posicionado abaixo do card. */}
      <TouchableOpacity style={styles.speakButtonContainer} onPress={speakWord}>
        <Text style={styles.speakButtonText}>🔊 Ouvir Pronúncia</Text>
      </TouchableOpacity>

      <View>
        {user ? (
          <>
            <Button
              title="Ver Favoritos ⭐"
              onPress={() => navigation.navigate("Favorites")}
            />
            <Button
              title="Meu Perfil"
              onPress={() => navigation.navigate("Profile")}
            />
          </>
        ) : (
          <Button
            title="Faça Login para Salvar e Ver Favoritos"
            onPress={() => navigation.navigate("Login")}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// NOVO: Estilos locais para o botão de áudio.
const styles = StyleSheet.create({
  speakButtonContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20, // Espaçamento vertical
    // Sombra para dar um efeito de elevação
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  speakButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
