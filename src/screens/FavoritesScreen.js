import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as MailComposer from "expo-mail-composer"; // NOVO: Importa a biblioteca de e-mail
import { styles as globalStyles, COLORS } from "../styles/styles";

export default function FavoritesScreen({
  user,
  favorites,
  removeFavorite,
  updateFavoriteNote,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [noteText, setNoteText] = useState("");

  // NOVO: Função para formatar e enviar o e-mail
  const handleEmailExport = async () => {
    // 1. Verifica se o dispositivo pode enviar e-mails
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(
        "E-mail não disponível",
        "Não foi possível abrir o aplicativo de e-mail. Por favor, verifique se há um cliente de e-mail configurado no seu dispositivo."
      );
      return;
    }

    // 2. Formata a lista de favoritos para o corpo do e-mail
    const emailBody = favorites
      .map((fav) => {
        let entry = `• ${fav.en} -> ${fav.pt}`;
        if (fav.note) {
          entry += `\n  Nota: ${fav.note}`;
        }
        return entry;
      })
      .join("\n\n"); // Adiciona uma linha dupla entre cada palavra

    // 3. Define as opções do e-mail
    const mailOptions = {
      recipients: [user.email], // Preenche com o e-mail do usuário logado
      subject: "Minha Lista de Favoritos - English Flashcards",
      body: `Olá!\n\nAqui está a sua lista de palavras favoritas salvas no app:\n\n${emailBody}\n\nContinue estudando!\nEquipe English Flashcards`,
    };

    // 4. Abre a tela de composição de e-mail
    await MailComposer.composeAsync(mailOptions);
  };

  const handleRemoveFavorite = (wordToRemove) => {
    removeFavorite(wordToRemove, user.email);
  };

  const openEditModal = (word) => {
    setEditingWord(word);
    setNoteText(word.note || "");
    setIsModalVisible(true);
  };

  const handleSaveNote = () => {
    if (editingWord) {
      updateFavoriteNote(editingWord, noteText, user.email);
    }
    setIsModalVisible(false);
    setEditingWord(null);
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favItemContainer}>
      <View style={styles.favItemTextContainer}>
        <Text style={globalStyles.favItem}>
          {item.en} → {item.pt}
        </Text>
        {item.note && <Text style={styles.noteText}>Nota: {item.note}</Text>}
      </View>
      <View style={styles.favItemActions}>
        {/* ALTERAÇÃO DE ACESSIBILIDADE ABAIXO */}
        <TouchableOpacity
          onPress={() => openEditModal(item)}
          // NOVO: Adiciona uma etiqueta para leitores de tela
          accessibilityLabel={`Editar nota para a palavra ${item.en}`}
        >
          <Text style={styles.actionButton}>✏️</Text>
        </TouchableOpacity>
        
        {/* ALTERAÇÃO DE ACESSIBILIDADE ABAIXO */}
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(item)}
          // NOVO: Adiciona uma etiqueta para leitores de tela
          accessibilityLabel={`Remover ${item.en} dos favoritos`}
        >
          <Text style={styles.actionButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[globalStyles.container, { justifyContent: "flex-start" }]}
    >
      <Text style={globalStyles.title}>⭐ Favoritos</Text>

      {/* NOVO: Botão para exportar por e-mail */}
      {favorites.length > 0 && (
        <View style={styles.exportButtonContainer}>
          <Button
            title="Exportar Favoritos por E-mail"
            onPress={handleEmailExport}
            color={COLORS.primary}
          />
        </View>
      )}

      {favorites.length === 0 ? (
        <Text style={globalStyles.instructions}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.en}
          renderItem={renderFavoriteItem}
          style={{ width: "90%" }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Editar Nota para "{editingWord?.en}"
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite sua nota ou frase de exemplo"
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancelar"
                onPress={() => setIsModalVisible(false)}
                color={COLORS.secondary}
              />
              <Button
                title="Salvar"
                onPress={handleSaveNote}
                color={COLORS.primary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  favItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
  },
  favItemTextContainer: {
    flex: 1,
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 5,
  },
  favItemActions: {
    flexDirection: "row",
  },
  actionButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  // NOVO: Estilo para o container do botão de exportação
  exportButtonContainer: {
    marginVertical: 15,
    width: "90%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    minHeight: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
