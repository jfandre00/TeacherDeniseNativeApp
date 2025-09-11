import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FlashcardsScreen from '../screens/FlashcardsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// ALTERADO: Recebe 'updateFavoriteNote' e passa adiante.
export default function AppNavigator({ user, setUser, favorites, addFavorite, removeFavorite, updateFavoriteNote }) {
  return (
    <Stack.Navigator>
      {user ? (
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
                updateFavoriteNote={updateFavoriteNote} // <-- Nova prop aqui
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Profile" options={{ title: 'Meu Perfil' }}>
             {() => <ProfileScreen user={user} setUser={setUser} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Flashcards" options={{ headerShown: false }}>
            {(props) => (
              <FlashcardsScreen {...props} user={user} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Login"
            options={{ title: 'Faça seu Login' }}
          >
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}