import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  primary: '#007BFF',   // Azul
  secondary: '#B30000', // Vermelho
  background: '#F0F2F5' // Fundo claro
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 0,
    marginTop: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
    marginTop: 0,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: 'bold',
    
  },
  cardContainer: {
    marginTop: 10,
    margin: 20,
    width: 250,
    height: 350,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  favItem: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
