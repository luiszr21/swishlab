import { Router, Response } from 'express';

const router = Router();

const CATEGORIES = [
  {
    id: 'arremesso',
    nome: 'Arremesso',
    descricao: 'Treinos para mecânica, precisão e volume de finalização.',
    icone: '🎯',
    cor: '#F59E0B',
    habilidades: ['Arremesso']
  },
  {
    id: 'drible',
    nome: 'Drible',
    descricao: 'Controle de bola, mudança de direção e criação de espaço.',
    icone: '🔄',
    cor: '#4ECDC4',
    habilidades: ['Drible']
  },
  {
    id: 'ataque-defesa',
    nome: 'Ataque e Defesa',
    descricao: 'Treinos de passe, físico, poste e leitura defensiva.',
    icone: '🛡️',
    cor: '#EF4444',
    habilidades: ['Defesa', 'Passe', 'Físico', 'Poste']
  },
  {
    id: 'posicao',
    nome: 'Posição',
    descricao: 'Abra as posições existentes e veja treinos específicos.',
    icone: '🏀',
    cor: '#A855F7',
    habilidades: []
  }
];

router.get('/', (req, res: Response) => {
  res.json({ categories: CATEGORIES });
});

export default router;
