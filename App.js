import React, { useState, useEffect, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';

const USER_STORAGE_KEY = '@english_flashcards:user';
const FAVORITES_STORAGE_KEY = '@english_flashcards:favorites';

// Mantém a tela de splash visível enquanto carregamos os recursos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const [favoritesByUsers, setFavoritesByUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // NOVO: Carrega as fontes customizadas
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  // O useEffect de carregar e salvar continua igual.

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUserString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (savedUserString) {
          setUser(JSON.parse(savedUserString));
        }
        const savedFavoritesString = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (savedFavoritesString) {
          setFavoritesByUsers(JSON.parse(savedFavoritesString));
        }
      } catch (e) {
        console.error('Falha ao carregar os dados do armazenamento', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

    // NOVO: Esconde a tela de splash apenas quando as fontes e os dados estiverem carregados.
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Falha ao salvar o usuário', e);
      }
    };
    if (!isLoading) {
      saveUser();
    }
  }, [user, isLoading]);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesByUsers));
      } catch (e) {
        console.error('Falha ao salvar os favoritos', e);
      }
    };
    if (!isLoading) {
      saveFavorites();
    }
  }, [favoritesByUsers, isLoading]);


  const currentUserFavorites = user ? favoritesByUsers[user.email] || [] : [];

  // ALTERADO: A função 'addFavorite' agora inclui uma propriedade 'note' vazia.
  const addFavorite = (word, userEmail) => {
    setFavoritesByUsers(prevFavorites => {
      const userFavorites = prevFavorites[userEmail] || [];
      if (!userFavorites.some(fav => fav.en === word.en)) {
        // Adicionamos o novo favorito com a propriedade 'note'.
        const newFavorite = { ...word, note: '' };
        return {
          ...prevFavorites,
          [userEmail]: [...userFavorites, newFavorite],
        };
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (word, userEmail) => {
    setFavoritesByUsers(prevFavorites => ({
      ...prevFavorites,
      [userEmail]: (prevFavorites[userEmail] || []).filter(fav => fav.en !== word.en),
    }));
  };

  // NOVO: Função para atualizar a nota de um favorito.
  const updateFavoriteNote = (wordToUpdate, newNote, userEmail) => {
    setFavoritesByUsers(prevFavorites => {
      const userFavorites = prevFavorites[userEmail] || [];
      const updatedFavorites = userFavorites.map(fav => {
        // Se encontrarmos a palavra que queremos atualizar...
        if (fav.en === wordToUpdate.en) {
          // ...retornamos um novo objeto com a nota atualizada.
          return { ...fav, note: newNote };
        }
        // Caso contrário, retornamos o favorito como ele estava.
        return fav;
      });

      return {
        ...prevFavorites,
        [userEmail]: updatedFavorites,
      };
    });
  };

 // Se as fontes ou os dados ainda não carregaram, não renderiza nada.
  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    // A view principal precisa ter o onLayout para sabermos quando esconder a splash screen
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AppNavigator
          user={user}
          setUser={setUser}
          favorites={currentUserFavorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          updateFavoriteNote={updateFavoriteNote}
        />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}