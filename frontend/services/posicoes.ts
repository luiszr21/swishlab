/**
 * Tipos baseados na estrutura do banco
 */
export interface CategoriaTreino {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  criado_em?: string;
}

export interface Posicao {
  id: string;
  nome: string;
  abreviacao: string;
  descricao: string;
  icone: string;
  cor: string;
  treinos?: any[];
}

/**
 * Interface de resposta para operações
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const API_URL = 'http://localhost:3000/api';

/**
 * Busca todas as categorias (posições) de treino
 */
export const getCategoriasTreino = async (): Promise<ApiResponse<CategoriaTreino[]>> => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    
    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
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
    const response = await fetch(`${API_URL}/categories`);
    
    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
    const categoria = data.find((cat: CategoriaTreino) => cat.id === categoriaId);

    if (!categoria) {
      return { data: null, error: 'Categoria não encontrada' };
    }

    return { data: categoria, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};
