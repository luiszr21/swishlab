import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { arredondamento, cores, espacamento } from '../constants/theme';
import { getIsLogged } from '../services/userData';

export default function Landing() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await getIsLogged();
      if (isLogged) {
        router.replace('/categorias');
      } else {
        router.replace('/auth/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
        <View style={styles.content}>
          <Text style={styles.title}>Verificando autenticação...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: espacamento.lg,
  },
  content: {
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.lg,
    padding: espacamento.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: cores.textoPrimario,
    textAlign: 'center',
  },
});