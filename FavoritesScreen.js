import React from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { styles, COLORS } from './styles';

export default function FavoritesScreen({ favorites }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⭐ Favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.instructions}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.favItem}>
              {item.en} → {item.pt}
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
}
