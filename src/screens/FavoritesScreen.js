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
} from "react-native";
import { styles as globalStyles, COLORS } from "../styles/styles";

export default function FavoritesScreen({
  user,
  favorites,
  removeFavorite,
  updateFavoriteNote,
}) {
  // NOVO: Estados para controlar o Modal de edição.
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWord, setEditingWord] = useState(null); // Guarda a palavra que está sendo editada
  const [noteText, setNoteText] = useState(""); // Guarda o texto da nota

  const handleRemoveFavorite = (wordToRemove) => {
    removeFavorite(wordToRemove, user.email);
  };

  // NOVO: Funções para abrir e fechar o Modal.
  const openEditModal = (word) => {
    setEditingWord(word);
    setNoteText(word.note || ""); // Pega a nota existente ou uma string vazia
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
        {/* NOVO: Exibe a nota se ela existir. */}
        {item.note && <Text style={styles.noteText}>Nota: {item.note}</Text>}
      </View>
      <View style={styles.favItemActions}>
        {/* NOVO: Botão de edição. */}
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Text style={styles.actionButton}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
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

      {/* NOVO: Definição do Modal de Edição */}
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

// ESTILOS: Adicione/substitua os estilos no final do arquivo.
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
  // Estilos do Modal
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
