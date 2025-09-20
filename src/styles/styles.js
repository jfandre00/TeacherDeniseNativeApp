import { StyleSheet, Platform } from 'react-native';

// Paleta de cores moderna e refinada
export const COLORS = {
  primary: '#5B21B6',   // Roxo vibrante
  secondary: '#F97316', // Laranja para ações secundárias/destaque
  background: '#F3F4F6', // Cinza muito claro para o fundo
  text: '#1F2937',      // Cinza escuro para texto
  textLight: '#6B7280', // Cinza claro para instruções
  cardFront: '#5B21B6',
  cardBack: '#10B981',   // Verde esmeralda para o verso do card
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  title2: { // Reestilizado como um subtítulo
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  instructions: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24, // Melhora a legibilidade
    marginBottom: 10,
  },
  cardContainer: {
    width: 280,
    height: 280,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20, // Espaço antes do botão de áudio
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Adiciona padding interno
  },
  cardText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: COLORS.white,
    textAlign: 'center',
  },
  favItem: { // Estilo para a lista de favoritos
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
});
