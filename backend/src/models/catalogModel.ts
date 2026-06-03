import { POSITIONS_DATA } from '../data/positions';

export const CATEGORIES = [
  {
    id: 'arremesso',
    nome: 'Arremesso',
    descricao: 'Treinos para mecânica, precisão e volume de finalização.',
    icone: '🎯',
    cor: '#F59E0B',
    habilidades: ['Arremesso'],
  },
  {
    id: 'drible',
    nome: 'Drible',
    descricao: 'Controle de bola, mudança de direção e criação de espaço.',
    icone: '🔄',
    cor: '#4ECDC4',
    habilidades: ['Drible'],
  },
  {
    id: 'ataque-defesa',
    nome: 'Ataque e Defesa',
    descricao: 'Treinos de passe, físico, poste e leitura defensiva.',
    icone: '🛡️',
    cor: '#EF4444',
    habilidades: ['Defesa', 'Passe', 'Físico', 'Poste'],
  },
  {
    id: 'posicao',
    nome: 'Posição',
    descricao: 'Abra as posições existentes e veja treinos específicos.',
    icone: '🏀',
    cor: '#A855F7',
    habilidades: [],
  },
];

export function getCategories() {
  return CATEGORIES;
}

export function getPositions(includeTrainings: boolean) {
  return POSITIONS_DATA.map((pos) => ({
    id: pos.id,
    nome: pos.nome,
    abreviacao: pos.abreviacao,
    descricao: pos.descricao,
    icone: pos.icone,
    cor: pos.cor,
    treinos: includeTrainings ? pos.treinos : [],
  }));
}

export function getPositionById(positionId: string) {
  return POSITIONS_DATA.find((position) => position.id === positionId) ?? null;
}

export function getTrainingsByCategory(categoryId: string, page: number, limit: number) {
  const skillsMap: Record<string, string[]> = {
    arremesso: ['Arremesso'],
    drible: ['Drible'],
    'ataque-defesa': ['Defesa', 'Passe', 'Físico', 'Poste'],
  };

  const skills = skillsMap[categoryId];
  if (!skills) {
    return null;
  }

  const trainings = POSITIONS_DATA.flatMap((position) =>
    position.treinos
      .filter((training) => skills.includes(training.habilidade))
      .map((training) => ({
        ...training,
        position: { id: position.id, nome: position.nome, abreviacao: position.abreviacao },
      }))
  );

  const total = trainings.length;
  const offset = (page - 1) * limit;

  return {
    trainings: trainings.slice(offset, offset + limit),
    total,
  };
}

export function getTrainingsBySkill(skill: string, page: number, limit: number) {
  const trainings = POSITIONS_DATA.flatMap((position) =>
    position.treinos
      .filter((training) => training.habilidade === skill)
      .map((training) => ({
        ...training,
        position: { id: position.id, nome: position.nome, abreviacao: position.abreviacao },
      }))
  );

  if (trainings.length === 0) {
    return null;
  }

  const total = trainings.length;
  const offset = (page - 1) * limit;

  return {
    trainings: trainings.slice(offset, offset + limit),
    total,
  };
}

export function getTrainingById(trainingId: string) {
  for (const position of POSITIONS_DATA) {
    const training = position.treinos.find((item) => item.id === trainingId);
    if (training) {
      return {
        ...training,
        position: { id: position.id, nome: position.nome, abreviacao: position.abreviacao, cor: position.cor },
      };
    }
  }

  return null;
}