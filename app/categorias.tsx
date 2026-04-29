import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { arredondamento, cores, espacamento } from '../constants/theme';
import { getIsLogged, logoutUser } from '../services/userData';

type CategoriaTreino = {
  id: 'arremesso' | 'drible' | 'ataque-defesa' | 'posicao';
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
};

const categorias: CategoriaTreino[] = [
  {
    id: 'arremesso',
    nome: 'Arremesso',
    descricao: 'Treinos para mecânica, precisão e volume de finalização.',
    icone: '🎯',
    cor: '#F59E0B',
  },
  {
    id: 'drible',
    nome: 'Drible',
    descricao: 'Controle de bola, mudança de direção e criação de espaço.',
    icone: '🔄',
    cor: '#4ECDC4',
  },
  {
    id: 'ataque-defesa',
    nome: 'Ataque e Defesa',
    descricao: 'Treinos de passe, físico, poste e leitura defensiva.',
    icone: '🛡️',
    cor: '#EF4444',
  },
  {
    id: 'posicao',
    nome: 'Posição',
    descricao: 'Abra as posições existentes e veja treinos específicos.',
    icone: '🏀',
    cor: '#A855F7',
  },
];

export default function TelaCategorias() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await getIsLogged();
      if (!isLogged) {
        router.replace('/auth/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleSelecionarCategoria = (categoriaId: CategoriaTreino['id']) => {
    if (categoriaId === 'posicao') {
      router.push('/inicio');
      return;
    }

    router.push({
      pathname: '/categoria-treinos',
      params: { categoriaId },
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/');
  };

  const renderCabecalho = () => (
    <View style={styles.cabecalho}>
      <View style={styles.cabecalhoTopo}>
        <Text style={styles.eyebrow}>🏀 DIVISÃO DE TREINOS</Text>
        <TouchableOpacity style={styles.botaoLogout} onPress={handleLogout}>
          <Text style={styles.logoutTexto}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Como você quer{`\n`}treinar hoje?</Text>
      <Text style={styles.subtitulo}>
        Escolha uma categoria para ver os treinos filtrados ou abra as posições existentes.
      </Text>
    </View>
  );

  const renderCategoria = ({ item }: { item: CategoriaTreino }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelecionarCategoria(item.id)}
      activeOpacity={0.85}
    >
      <View style={[styles.cardDestaque, { backgroundColor: item.cor }]} />
      <View style={styles.cardConteudo}>
        <View style={styles.cardTopo}>
          <View
            style={[
              styles.badge,
              { backgroundColor: item.cor + '20', borderColor: item.cor + '40' },
            ]}
          >
            <Text style={[styles.badgeTexto, { color: item.cor }]}>{item.nome}</Text>
          </View>
          <Text style={styles.icone}>{item.icone}</Text>
        </View>
        <Text style={styles.nomeCategoria}>{item.nome}</Text>
        <Text style={styles.descricaoCategoria}>{item.descricao}</Text>
        <View style={styles.cardRodape}>
          <Text style={styles.quantidadeTreinos}>Abrir</Text>
          <View style={[styles.botaoSeta, { backgroundColor: item.cor }]}>
            <Text style={styles.seta}>→</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <ImageBackground
        source={require('../assets/images/imagem_home.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoria}
          ListHeaderComponent={renderCabecalho}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 15, 0.68)',
  },
  listaConteudo: {
    paddingBottom: espacamento.xl,
    paddingTop: espacamento.sm,
  },
  cabecalho: {
    paddingHorizontal: espacamento.lg,
    paddingTop: espacamento.xl,
    paddingBottom: espacamento.lg,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.destaque,
    letterSpacing: 2,
    marginBottom: espacamento.sm,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: cores.textoPrimario,
    marginBottom: espacamento.sm,
    letterSpacing: -1,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 22,
  },
  cabecalhoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacamento.sm,
  },
  botaoLogout: {
    backgroundColor: 'rgba(20, 20, 28, 0.72)',
    paddingHorizontal: espacamento.sm,
    paddingVertical: espacamento.xs,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  logoutTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.textoPrimario,
  },
  card: {
    marginHorizontal: espacamento.lg,
    marginBottom: espacamento.sm,
    backgroundColor: 'rgba(20, 20, 28, 0.58)',
    borderRadius: arredondamento.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  cardDestaque: {
    height: 3,
    width: '100%',
  },
  cardConteudo: {
    padding: espacamento.lg,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacamento.sm,
  },
  badge: {
    paddingHorizontal: espacamento.sm,
    paddingVertical: espacamento.xs,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
  },
  badgeTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
  icone: {
    fontSize: 28,
  },
  nomeCategoria: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.xs,
  },
  descricaoCategoria: {
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 20,
    marginBottom: espacamento.md,
  },
  cardRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantidadeTreinos: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.textoDesativado,
  },
  botaoSeta: {
    width: 32,
    height: 32,
    borderRadius: arredondamento.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seta: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});