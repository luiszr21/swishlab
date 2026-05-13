import { Router, Response } from 'express';
import { POSITIONS_DATA } from '../data/positions';

const router = Router();

// Get all positions
router.get('/', (req, res: Response) => {
  const includeTrainings = req.query.includeTrainings === 'true';

  const positions = POSITIONS_DATA.map(pos => ({
    id: pos.id,
    nome: pos.nome,
    abreviacao: pos.abreviacao,
    descricao: pos.descricao,
    icone: pos.icone,
    cor: pos.cor,
    treinos: includeTrainings ? pos.treinos : []
  }));

  res.json({ positions });
});

// Get specific position
router.get('/:positionId', (req, res: Response) => {
  const { positionId } = req.params;
  const position = POSITIONS_DATA.find(p => p.id === positionId);

  if (!position) {
    return res.status(404).json({ error: 'Position not found' });
  }

  res.json(position);
});

export default router;
