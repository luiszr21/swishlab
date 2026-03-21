import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { posicoes } from '../data/posicoes';
import { cores, espacamento, arredondamento } from '../constants/theme';

const ICONES_HABILIDADE: Record<string, string> = {
  Drible: '🔄',
  Arremesso: '🎯',
  Defesa: '🛡️',
  Passe: '↗️',
  Físico: '💪',
  Poste: '🏋️',
};

export default function TelaDetalheTreino() {
  const router = useRouter();
  const { posicaoId, treinoId } = useLocalSearchParams<{
    posicaoId: string;
    treinoId: string;
  }>();

  const posicao = posicoes.find((p) => p.id === posicaoId);
  const treino = posicao?.treinos.find((t) => t.id === treinoId);

  if (!posicao || !treino) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: cores.textoPrimario, padding: espacamento.lg }}>
          Treino não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  const abrirYoutube = () => {
    Linking.openURL(treino.urlYoutube);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Botão voltar */}
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={[styles.cabecalho, { borderColor: posicao.cor + '40' }]}>
          <View style={styles.cabecalhoTopo}>
            <Text style={styles.iconeHabilidade}>
              {ICONES_HABILIDADE[treino.habilidade]}
            </Text>
            <View style={[styles.tag, { backgroundColor: posicao.cor + '20', borderColor: posicao.cor + '40' }]}>
              <Text style={[styles.tagTexto, { color: posicao.cor }]}>{treino.habilidade}</Text>
            </View>
          </View>
          <Text style={styles.titulo}>{treino.titulo}</Text>
          <Text style={styles.descricao}>{treino.descricao}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoTexto}>⏱ {treino.duracao}</Text>
            <Text style={styles.infoTexto}>📍 {posicao.nome}</Text>
          </View>
        </View>

        {/* Dicas */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>💡 Dicas do treino</Text>
          {treino.dicas.map((dica, index) => (
            <View key={index} style={styles.dicaCard}>
              <View style={[styles.dicaNumero, { backgroundColor: posicao.cor }]}>
                <Text style={styles.dicaNumeroTexto}>{index + 1}</Text>
              </View>
              <Text style={styles.dicaTexto}>{dica}</Text>
            </View>
          ))}
        </View>

        {/* Botão YouTube */}
        <TouchableOpacity
          style={[styles.botaoYoutube, { backgroundColor: posicao.cor }]}
          onPress={abrirYoutube}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoYoutubeIcone}>▶</Text>
          <Text style={styles.botaoYoutubeTexto}>Ver vídeo no YouTube</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacamento.lg,
    paddingBottom: espacamento.xl,
  },
  botaoVoltar: {
    marginBottom: espacamento.lg,
  },
  textoVoltar: {
    fontSize: 14,
    color: cores.destaque,
  },
  cabecalho: {
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.lg,
    borderWidth: 1,
    padding: espacamento.lg,
    marginBottom: espacamento.lg,
  },
  cabecalhoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacamento.md,
  },
  iconeHabilidade: {
    fontSize: 36,
  },
  tag: {
    paddingHorizontal: espacamento.sm,
    paddingVertical: espacamento.xs,
    borderRadius: arredondamento.sm,
    borderWidth: 1,
  },
  tagTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.sm,
  },
  descricao: {
    fontSize: 15,
    color: cores.textoSecundario,
    lineHeight: 22,
    marginBottom: espacamento.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: espacamento.lg,
  },
  infoTexto: {
    fontSize: 13,
    color: cores.textoDesativado,
  },
  secao: {
    marginBottom: espacamento.lg,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.textoPrimario,
    marginBottom: espacamento.md,
  },
  dicaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: arredondamento.md,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamento.md,
    marginBottom: espacamento.sm,
    gap: espacamento.md,
  },
  dicaNumero: {
    width: 28,
    height: 28,
    borderRadius: arredondamento.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dicaNumeroTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  dicaTexto: {
    flex: 1,
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 20,
  },
  botaoYoutube: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacamento.lg,
    borderRadius: arredondamento.lg,
    gap: espacamento.sm,
    marginTop: espacamento.sm,
  },
  botaoYoutubeIcone: {
    fontSize: 16,
    color: '#fff',
  },
  botaoYoutubeTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});