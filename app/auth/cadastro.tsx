import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../../services/userData';

export default function Cadastro() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      Alert.alert('Erro', 'Informe um email válido.');
      return;
    }

    setLoading(true);
    try {
      await registerUser({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword });
      Alert.alert('Sucesso', 'Conta criada! Verifique seu email para confirmar o cadastro.');
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Use nome de usuário, email e senha para se cadastrar.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="username"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>
      <Link href="/auth/login" asChild>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    alignSelf: 'center',
  },
  linkText: {
    color: '#2563eb',
    fontSize: 15,
  },
});