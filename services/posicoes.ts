import { supabase } from './supabase';

/**
 * Tipos baseados na estrutura do banco
 */
export interface CategoriaTreino {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  criado_em: string;
}

/**
 * Interface de resposta para operações
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Busca todas as categorias (posições) de treino
 */
export const getCategoriasTreino = async (): Promise<ApiResponse<CategoriaTreino[]>> => {
  try {
    const { data, error } = await supabase
      .from('categorias_treino')
      .select('*')
      .order('criado_em', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Busca uma categoria específica por ID
 */
export const getCategoriaTreinoById = async (
  categoriaId: string
): Promise<ApiResponse<CategoriaTreino>> => {
  try {
    const { data, error } = await supabase
      .from('categorias_treino')
      .select('*')
      .eq('id', categoriaId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};
