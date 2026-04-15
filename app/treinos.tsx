import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { arredondamento, cores, espacamento } from "../constants/theme";
import { posicoes, Treino } from "../data/posicoes";

const ICONES_HABILIDADE: Record<string, string> = {
  Drible: "🔄",
  Arremesso: "🎯",
  Defesa: "🛡️",
  Passe: "↗️",
  Físico: "💪",
  Poste: "🏋️",
};

export default function TelaTreinos() {
  const router = useRouter();
  const { posicaoId } = useLocalSearchParams<{ posicaoId: string }>();

  const posicao = posicoes.find((p) => p.id === posicaoId);

  if (!posicao) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: cores.textoPrimario, padding: espacamento.lg }}>
          Posição não encontrada.
        </Text>
      </SafeAreaView>
    );
  }

  const handleSelecionarTreino = (treino: Treino) => {
    router.push({
      pathname: "/detalhe-treinos",
      params: { posicaoId: posicao.id, treinoId: treino.id },
    });
  };

  const renderCabecalho = () => (
    <View style={styles.cabecalho}>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>
      <View style={styles.topoPosicao}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: posicao.cor + "20",
              borderColor: posicao.cor + "50",
            },
          ]}
        >
          <Text style={[styles.badgeTexto, { color: posicao.cor }]}>
            {posicao.abreviacao}
          </Text>
        </View>
        <Text style={styles.icone}>{posicao.icone}</Text>
      </View>
      <Text style={styles.titulo}>{posicao.nome}</Text>
      <Text style={styles.subtitulo}>{posicao.descricao}</Text>
      <Text style={styles.totalTreinos}>
        {posicao.treinos.length} treinos disponíveis
      </Text>
    </View>
  );

  const renderTreino = ({ item }: { item: Treino }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelecionarTreino(item)}
      activeOpacity={0.85}
    >
      <View
        style={[styles.cardEsquerda, { backgroundColor: posicao.cor + "15" }]}
      >
        <Text style={styles.iconeHabilidade}>
          {ICONES_HABILIDADE[item.habilidade]}
        </Text>
      </View>
      <View style={styles.cardCorpo}>
        <Text style={styles.tituloTreino}>{item.titulo}</Text>
        <Text style={styles.descricaoTreino} numberOfLines={2}>
          {item.descricao}
        </Text>
        <View style={styles.rodape}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: posicao.cor + "15",
                borderColor: posicao.cor + "40",
              },
            ]}
          >
            <Text style={[styles.tagTexto, { color: posicao.cor }]}>
              {item.habilidade}
            </Text>
          </View>
          <Text style={styles.duracao}>⏱ {item.duracao}</Text>
        </View>
      </View>
      <Text style={styles.seta}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <FlatList
        data={posicao.treinos}
        keyExtractor={(item) => item.id}
        renderItem={renderTreino}
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
  topoPosicao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "600",
  },
  icone: {
    fontSize: 32,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
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
    fontWeight: "600",
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
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  cardEsquerda: {
    width: 56,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "600",
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
    flexDirection: "row",
    alignItems: "center",
    gap: espacamento.sm,
  },
  tag: {
    paddingHorizontal: espacamento.xs + 2,
    paddingVertical: 2,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: "600",
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
});
