import { getCurrentUser } from './auth';

/**
 * Tipos baseados na estrutura do banco
 */
export interface Treino {
  id: string;
  id_categoria: string;
  titulo: string;
  descricao: string;
  duracao_minutos: number;
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  url_video: string;
  tempo_inicio_segundos?: number;
  tempo_fim_segundos?: number;
  criado_em: string;
}

export interface ProgressoUsuario {
  id: string;
  id_usuario: string;
  id_treino: string;
  concluido_em: string;
  duracao_minutos: number;
  notas?: string;
}

export interface TreinoComProgresso extends Treino {
  progresso?: ProgressoUsuario | null;
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
 * Busca todos os treinos de uma categoria
 */
export const getTreinosPorCategoria = async (
  categoriaId: string
): Promise<ApiResponse<Treino[]>> => {
  try {
    const response = await fetch(`${API_URL}/trainings?category=${categoriaId}`);

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
 * Busca um treino específico por ID
 */
export const getTreinoById = async (treinoId: string): Promise<ApiResponse<Treino>> => {
  try {
    const response = await fetch(`${API_URL}/trainings/${treinoId}`);

    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Registra o progresso de um treino para o usuário
 */
export const registrarProgressoTreino = async (
  idUsuario: string,
  idTreino: string,
  durationMinutes: number,
  notes?: string
): Promise<ApiResponse<ProgressoUsuario>> => {
  try {
    if (!idUsuario || !idTreino) {
      return { data: null, error: 'ID do usuário e do treino são obrigatórios.' };
    }

    const user = await getCurrentUser();
    if (!user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    const response = await fetch(`${API_URL}/users/training-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify({
        training_id: idTreino,
        duration_minutes: durationMinutes,
        notes,
      }),
    });

    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Busca o progresso de um usuário em um treino específico
 */
export const getProgressoTreino = async (
  idUsuario: string,
  idTreino: string
): Promise<ApiResponse<ProgressoUsuario | null>> => {
  try {
    const response = await fetch(`${API_URL}/users/training-history`, {
      headers: {
        'Authorization': `Bearer ${await getAuthToken()}`,
      },
    });

    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
    const progresso = data.find((p: any) => p.training_id === idTreino);

    return { data: progresso || null, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Busca todo o histórico de progresso de um usuário
 */
export const getHistoricoProgressoUsuario = async (
  idUsuario: string
): Promise<ApiResponse<ProgressoUsuario[]>> => {
  try {
    const response = await fetch(`${API_URL}/users/training-history`, {
      headers: {
        'Authorization': `Bearer ${await getAuthToken()}`,
      },
    });

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
 * Busca treinos com progresso do usuário
 */
export const getTreinosComProgresso = async (
  idUsuario: string,
  categoriaId: string
): Promise<ApiResponse<TreinoComProgresso[]>> => {
  try {
    // Busca todos os treinos da categoria
    const { data: treinos, error: treinosError } = await getTreinosPorCategoria(categoriaId);

    if (treinosError || !treinos) {
      return { data: null, error: treinosError };
    }

    if (treinos.length === 0) {
      return { data: [], error: null };
    }

    // Busca histórico do usuário
    const { data: historico, error: historicoError } = await getHistoricoProgressoUsuario(idUsuario);

    if (historicoError || !historico) {
      return { data: null, error: historicoError };
    }

    // Mapeia progresso aos treinos
    const treinosComProgresso: TreinoComProgresso[] = treinos.map((treino) => {
      const progresso = historico.find((p: any) => p.training_id === treino.id);
      return {
        ...treino,
        progresso: progresso || null,
      };
    });

    return { data: treinosComProgresso, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Atualiza as notas de um progresso
 */
export const atualizarNotasProgresso = async (
  idProgresso: string,
  notas: string
): Promise<ApiResponse<ProgressoUsuario>> => {
  try {
    const response = await fetch(`${API_URL}/users/training-history/${idProgresso}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify({ notes: notas }),
    });

    if (!response.ok) {
      return { data: null, error: `Erro ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: message };
  }
};

/**
 * Helper para obter token de autenticação
 */
async function getAuthToken(): Promise<string> {
  try {
    const AsyncStorage = await import('@react-native-async-storage/async-storage').then(m => m.default);
    const token = await AsyncStorage.getItem('authToken');
    return token || '';
  } catch {
    return '';
  }
}
