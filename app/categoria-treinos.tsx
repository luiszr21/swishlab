import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
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
import { Posicao, posicoes, Treino } from '../data/posicoes';

type CategoriaId = 'arremesso' | 'drible' | 'ataque-defesa';

const CATEGORIAS: Record<
  CategoriaId,
  {
    nome: string;
    descricao: string;
    icone: string;
    cor: string;
    habilidades: Treino['habilidade'][];
  }
> = {
  arremesso: {
    nome: 'Arremesso',
    descricao: 'Treinos para mecânica, precisão e finalização.',
    icone: '🎯',
    cor: '#F59E0B',
    habilidades: ['Arremesso'],
  },
  drible: {
    nome: 'Drible',
    descricao: 'Controle de bola, mudança de direção e criação de espaço.',
    icone: '🔄',
    cor: '#4ECDC4',
    habilidades: ['Drible'],
  },
  'ataque-defesa': {
    nome: 'Ataque e Defesa',
    descricao: 'Treinos de passe, físico, poste e defesa coletiva.',
    icone: '🛡️',
    cor: '#EF4444',
    habilidades: ['Defesa', 'Passe', 'Físico', 'Poste'],
  },
};

const ICONES_HABILIDADE: Record<string, string> = {
  Drible: '🔄',
  Arremesso: '🎯',
  Defesa: '🛡️',
  Passe: '↗️',
  Físico: '💪',
  Poste: '🏋️',
};

type TreinoCategoria = {
  posicao: Posicao;
  treino: Treino;
};

export default function TelaCategoriaTreinos() {
  const router = useRouter();
  const { categoriaId } = useLocalSearchParams<{ categoriaId: CategoriaId }>();

  const categoria = categoriaId ? CATEGORIAS[categoriaId] : undefined;

  const treinos = posicoes.flatMap<TreinoCategoria>((posicao) =>
    posicao.treinos
      .filter((treino) => (categoria ? categoria.habilidades.includes(treino.habilidade) : false))
      .map((treino) => ({ posicao, treino }))
  );

  if (!categoria) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: cores.textoPrimario, padding: espacamento.lg }}>
          Categoria não encontrada.
        </Text>
      </SafeAreaView>
    );
  }

  const handleSelecionarTreino = (item: TreinoCategoria) => {
    router.push({
      pathname: '/detalhe-treinos',
      params: { posicaoId: item.posicao.id, treinoId: item.treino.id },
    });
  };

  const renderCabecalho = () => (
    <View style={styles.cabecalho}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.topoCategoria}>
        <View
          style={[
            styles.iconeCategoria,
            { backgroundColor: categoria.cor + '20', borderColor: categoria.cor + '40' },
          ]}
        >
          <Text style={styles.iconeCategoriaTexto}>{categoria.icone}</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: categoria.cor + '20', borderColor: categoria.cor + '40' },
          ]}
        >
          <Text style={[styles.badgeTexto, { color: categoria.cor }]}>{categoria.nome}</Text>
        </View>
      </View>

      <Text style={styles.titulo}>{categoria.nome}</Text>
      <Text style={styles.subtitulo}>{categoria.descricao}</Text>
      <Text style={styles.totalTreinos}>{treinos.length} treinos encontrados</Text>
    </View>
  );

  const renderTreino = ({ item }: { item: TreinoCategoria }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelecionarTreino(item)}
      activeOpacity={0.85}
    >
      <View style={[styles.cardEsquerda, { backgroundColor: categoria.cor + '15' }]}>
        <Text style={styles.iconeHabilidade}>{ICONES_HABILIDADE[item.treino.habilidade]}</Text>
      </View>
      <View style={styles.cardCorpo}>
        <Text style={styles.tituloTreino}>{item.treino.titulo}</Text>
        <Text style={styles.descricaoTreino} numberOfLines={2}>
          {item.treino.descricao}
        </Text>
        <View style={styles.rodape}>
          <View
            style={[
              styles.tag,
              { backgroundColor: categoria.cor + '15', borderColor: categoria.cor + '40' },
            ]}
          >
            <Text style={[styles.tagTexto, { color: categoria.cor }]}>{item.treino.habilidade}</Text>
          </View>
          <Text style={styles.duracao}>
            📍 {item.posicao.nome} • ⏱ {item.treino.duracao}
          </Text>
        </View>
      </View>
      <Text style={styles.seta}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <FlatList
        data={treinos}
        keyExtractor={(item) => `${item.posicao.id}-${item.treino.id}`}
        renderItem={renderTreino}
        ListHeaderComponent={renderCabecalho}
        contentContainerStyle={styles.listaConteudo}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum treino encontrado.</Text>
            <Text style={styles.emptyText}>
              Essa categoria ainda não possui treinos cadastrados.
            </Text>
          </View>
        }
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
    paddingTop: espacamento.lg,
    paddingBottom: espacamento.md,
  },
  botaoVoltar: {
    marginBottom: espacamento.lg,
  },
  textoVoltar: {
    fontSize: 14,
    color: cores.destaque,
  },
  topoCategoria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacamento.sm,
  },
  iconeCategoria: {
    width: 48,
    height: 48,
    borderRadius: arredondamento.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconeCategoriaTexto: {
    fontSize: 24,
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
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.xs,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 20,
    marginBottom: espacamento.sm,
  },
  totalTreinos: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.textoDesativado,
    marginBottom: espacamento.md,
  },
  card: {
    marginHorizontal: espacamento.lg,
    marginBottom: espacamento.sm,
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardEsquerda: {
    width: 56,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeHabilidade: {
    fontSize: 22,
  },
  cardCorpo: {
    flex: 1,
    padding: espacamento.md,
  },
  tituloTreino: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.textoPrimario,
    marginBottom: espacamento.xs,
  },
  descricaoTreino: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
    marginBottom: espacamento.sm,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamento.sm,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: espacamento.xs + 2,
    paddingVertical: 2,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  duracao: {
    fontSize: 11,
    color: cores.textoDesativado,
  },
  seta: {
    fontSize: 24,
    color: cores.textoDesativado,
    paddingRight: espacamento.sm,
  },
  emptyState: {
    marginHorizontal: espacamento.lg,
    marginTop: espacamento.md,
    padding: espacamento.lg,
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.lg,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.xs,
  },
  emptyText: {
    fontSize: 13,
    color: cores.textoSecundario,
    lineHeight: 19,
  },
});