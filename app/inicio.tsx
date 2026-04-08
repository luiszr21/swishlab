import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { arredondamento, cores, espacamento } from '../constants/theme';
import { Posicao, posicoes } from '../data/posicoes';
import { getIsLogged, logoutUser } from '../services/userData';

export default function TelaInicial() {
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

  const handleSelecionarPosicao = (posicao: Posicao) => {
    router.push({
      pathname: '/treinos',
      params: { posicaoId: posicao.id },
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/');
  };

  const renderCabecalho = () => (
    <View style={styles.cabecalho}>
      <View style={styles.cabecalhoTopo}>
        <Text style={styles.eyebrow}>🏀 BASKETBALL TRAINING</Text>
        <TouchableOpacity style={styles.botaoLogout} onPress={handleLogout}>
          <Text style={styles.logoutTexto}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Qual é a sua{`\n`}posição?</Text>
      <Text style={styles.subtitulo}>
        Selecione sua posição e acesse treinos específicos para o seu estilo de jogo.
      </Text>
    </View>
  );

  const renderPosicao = ({ item }: { item: Posicao }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelecionarPosicao(item)}
      activeOpacity={0.85}
    >
      <View style={[styles.cardDestaque, { backgroundColor: item.cor }]} />
      <View style={styles.cardConteudo}>
        <View style={styles.cardTopo}>
          <View style={[styles.badge, { backgroundColor: item.cor + '20', borderColor: item.cor + '40' }]}>
            <Text style={[styles.badgeTexto, { color: item.cor }]}>{item.abreviacao}</Text>
          </View>
          <Text style={styles.icone}>{item.icone}</Text>
        </View>
        <Text style={styles.nomePosicao}>{item.nome}</Text>
        <Text style={styles.descricaoPosicao}>{item.descricao}</Text>
        <View style={styles.cardRodape}>
          <Text style={styles.quantidadeTreinos}>{item.treinos.length} treinos</Text>
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
      <FlatList
        data={posicoes}
        keyExtractor={(item) => item.id}
        renderItem={renderPosicao}
        ListHeaderComponent={renderCabecalho}
        contentContainerStyle={styles.listaConteudo}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  listaConteudo: {
    paddingBottom: espacamento.xl,
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
    backgroundColor: cores.superficie,
    paddingHorizontal: espacamento.sm,
    paddingVertical: espacamento.xs,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  logoutTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.textoPrimario,
  },
  card: {
    marginHorizontal: espacamento.lg,
    marginBottom: espacamento.sm,
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.lg,
    borderWidth: 1,
    borderColor: cores.borda,
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
  nomePosicao: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.xs,
  },
  descricaoPosicao: {
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