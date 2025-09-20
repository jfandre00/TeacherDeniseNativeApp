import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Location from 'expo-location';
import * as MailComposer from 'expo-mail-composer';

import { styles as globalStyles, COLORS } from '../styles/styles';

export default function InterestFormScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPermissionError('A permissão para acessar a localização foi negada. Esta informação não será enviada.');
          setIsLocationLoading(false);
          return;
        }

        let currentPosition = await Location.getCurrentPositionAsync({});
        setLocation(currentPosition.coords);
      } catch (error) {
        console.error("Erro ao obter localização", error);
        setPermissionError('Não foi possível obter a localização.');
      } finally {
        setIsLocationLoading(false);
      }
    };

    getLocation();
  }, []);

  const onSubmit = async (data) => {
    const mailBody = `
      Olá, Teacher Denise!
      
      Gostaria de manifestar meu interesse em ser um aluno(a) VIP.
      Seguem meus dados para contato:
      
      - Nome: ${data.name}
      - E-mail: ${data.email}
      - Telefone: ${data.phone}
      
      ---
      Dados de Localização (para fins de análise demográfica):
      - Latitude: ${location ? location.latitude : 'Não fornecida'}
      - Longitude: ${location ? location.longitude : 'Não fornecida'}
    `;

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: ['contato@teacherdenise.com'], // E-mail de destino fictício
          subject: 'Novo Aluno Interessado - App English Flashcards',
          body: mailBody,
        });
        Alert.alert("Sucesso!", "Seu e-mail está pronto para ser enviado. Obrigado pelo seu interesse!");
      } else {
        Alert.alert("Erro", "Não foi encontrado um aplicativo de e-mail no seu dispositivo.");
      }
    } catch (error) {
      console.error("Erro ao compor e-mail", error);
      Alert.alert("Erro", "Ocorreu um problema ao tentar abrir o aplicativo de e-mail.");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1, width: '100%'}}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={globalStyles.title}>Seja um Aluno VIP!</Text>
          <Text style={styles.subtitle}>Preencha seus dados abaixo e entraremos em contato.</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              rules={{ required: 'O nome é obrigatório.' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome completo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            
            <Controller
              control={control}
              rules={{ required: 'O e-mail é obrigatório.', pattern: { value: /^\S+@\S+$/i, message: 'Formato de e-mail inválido.'} }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Seu melhor e-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
              control={control}
              rules={{ required: 'O telefone é obrigatório.' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Seu telefone (com DDD)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
              name="phone"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Sua Localização:</Text>
              {isLocationLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : permissionError ? (
                <Text style={styles.errorText}>{permissionError}</Text>
              ) : location ? (
                <Text style={styles.locationText}>
                  Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
                </Text>
              ) : null}
            </View>

            <Button title="Enviar Interesse" onPress={handleSubmit(onSubmit)} color={COLORS.primary}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  errorText: {
    color: COLORS.secondary,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 5,
  },
  locationContainer: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  locationLabel: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
  },
});