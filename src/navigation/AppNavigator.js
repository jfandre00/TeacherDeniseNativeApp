import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FlashcardsScreen from '../screens/FlashcardsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InterestFormScreen from '../screens/InterestFormScreen'; // NOVO: Importa a tela do formulário

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user, setUser, favorites, addFavorite, removeFavorite, updateFavoriteNote }) {
  return (
    <Stack.Navigator>
      {user ? (
        // --- Telas para usuários LOGADOS ---
        <>
          <Stack.Screen name="Flashcards" options={{ headerShown: false }}>
            {(props) => (
              <FlashcardsScreen
                {...props}
                user={user}
                favorites={favorites}
                addFavorite={addFavorite}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorites" options={{ title: 'Favoritos' }}>
            {() => (
              <FavoritesScreen
                user={user}
                favorites={favorites}
                removeFavorite={removeFavorite}
                updateFavoriteNote={updateFavoriteNote}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Profile" options={{ title: 'Meu Perfil' }}>
             {() => <ProfileScreen user={user} setUser={setUser} />}
          </Stack.Screen>
        </>
      ) : (
        // --- Telas para usuários DESLOGADOS ---
        <>
          <Stack.Screen name="Flashcards" options={{ headerShown: false }}>
            {(props) => (
              <FlashcardsScreen {...props} user={user} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" options={{ title: 'Faça seu Login' }}>
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          {/* NOVO: Adiciona a tela do formulário à navegação */}
          <Stack.Screen 
            name="InterestForm" 
            component={InterestFormScreen} 
            options={{ title: 'Formulário de Interesse' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}