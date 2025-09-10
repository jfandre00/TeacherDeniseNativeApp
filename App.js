import React, { useState } from 'react';
import { SafeAreaView, Text, Button, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { styles } from './styles';
import words from './words';
import Card from './Card';
import FavoritesScreen from './FavoritesScreen';

const Stack = createNativeStackNavigator();

function FlashcardsScreen({ navigation, favorites, setFavorites }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];

  const handleSwipeRight = () => setCurrentIndex((prev) => (prev + 1) % words.length);
  const handleSwipeLeft = () => setCurrentIndex((prev) => (prev === 0 ? words.length - 1 : prev - 1));

  // Função onLongPress com Alert seguro
  const handleLongPress = (word) => {
    if (!favorites.some((fav) => fav.en === word.en)) {
      setFavorites([...favorites, word]);
      Alert.alert('Favorito adicionado', `"${word.en}" foi salvo nos favoritos ⭐`);
    } else {
      Alert.alert('Já favoritado', `"${word.en}" já está nos favoritos.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>English Flashcards</Text>
      <Text style={styles.title2}>versão 1.0a</Text>
      <Text style={styles.instructions}>
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

      <Button title="Ver Favoritos ⭐" onPress={() => navigation.navigate('Favorites')} />
    </SafeAreaView>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Flashcards" options={{ headerShown: false }}>
            {(props) => (
              <FlashcardsScreen
                {...props}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorites" options={{ title: 'Favoritos' }}>
            {() => <FavoritesScreen favorites={favorites} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

