import { supabase } from './supabase';

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

/**
 * Busca todos os treinos de uma categoria
 */
export const getTreinosPorCategoria = async (
  categoriaId: string
): Promise<ApiResponse<Treino[]>> => {
  try {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('id_categoria', categoriaId)
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
 * Busca um treino específico por ID
 */
export const getTreinoById = async (treinoId: string): Promise<ApiResponse<Treino>> => {
  try {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('id', treinoId)
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

    const { data, error } = await supabase
      .from('progresso_usuario')
      .insert({
        id_usuario: idUsuario,
        id_treino: idTreino,
        duracao_minutos: durationMinutes,
        notas: notes,
        concluido_em: new Date().toISOString(),
      })
      .select()
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

/**
 * Busca o progresso de um usuário em um treino específico
 */
export const getProgressoTreino = async (
  idUsuario: string,
  idTreino: string
): Promise<ApiResponse<ProgressoUsuario | null>> => {
  try {
    const { data, error } = await supabase
      .from('progresso_usuario')
      .select('*')
      .eq('id_usuario', idUsuario)
      .eq('id_treino', idTreino)
      .order('concluido_em', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
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
    const { data, error } = await supabase
      .from('progresso_usuario')
      .select('*')
      .eq('id_usuario', idUsuario)
      .order('concluido_em', { ascending: false });

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
 * Busca treinos com progresso do usuário
 */
export const getTreinosComProgresso = async (
  idUsuario: string,
  categoriaId: string
): Promise<ApiResponse<TreinoComProgresso[]>> => {
  try {
    // Busca todos os treinos da categoria
    const { data: treinos, error: treinosError } = await supabase
      .from('treinos')
      .select('*')
      .eq('id_categoria', categoriaId)
      .order('criado_em', { ascending: true });

    if (treinosError) {
      return { data: null, error: treinosError.message };
    }

    if (!treinos || treinos.length === 0) {
      return { data: [], error: null };
    }

    // Busca progresso para cada treino
    const { data: progressos, error: progressoError } = await supabase
      .from('progresso_usuario')
      .select('*')
      .eq('id_usuario', idUsuario)
      .in(
        'id_treino',
        treinos.map((t) => t.id)
      );

    if (progressoError) {
      return { data: null, error: progressoError.message };
    }

    // Mapeia progresso aos treinos
    const treinosComProgresso: TreinoComProgresso[] = treinos.map((treino) => {
      const progresso = progressos?.find((p) => p.id_treino === treino.id);
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
    const { data, error } = await supabase
      .from('progresso_usuario')
      .update({ notas })
      .eq('id', idProgresso)
      .select()
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
