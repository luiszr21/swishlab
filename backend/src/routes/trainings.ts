import { Router, Response } from 'express';
import { POSITIONS_DATA } from '../data/positions';

const router = Router();

// Get trainings by category
router.get('/by-category/:categoryId', (req, res: Response) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skillsMap: Record<string, string[]> = {
    arremesso: ['Arremesso'],
    drible: ['Drible'],
    'ataque-defesa': ['Defesa', 'Passe', 'Físico', 'Poste'],
  };

  const skills = skillsMap[categoryId];
  if (!skills) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  let trainings = POSITIONS_DATA.flatMap(pos =>
    pos.treinos
      .filter(t => skills.includes(t.habilidade))
      .map(t => ({
        ...t,
        position: { id: pos.id, nome: pos.nome, abreviacao: pos.abreviacao }
      }))
  );

  const total = trainings.length;
  const start = (page - 1) * limit;
  trainings = trainings.slice(start, start + limit);

  res.json({ trainings, total, page, limit });
});

// Get training by skill
router.get('/skill/:skill', (req, res: Response) => {
  const { skill } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  let trainings = POSITIONS_DATA.flatMap(pos =>
    pos.treinos
      .filter(t => t.habilidade === skill)
      .map(t => ({
        ...t,
        position: { id: pos.id, nome: pos.nome, abreviacao: pos.abreviacao }
      }))
  );

  if (trainings.length === 0) {
    return res.status(400).json({ error: 'Invalid skill' });
  }

  const total = trainings.length;
  const start = (page - 1) * limit;
  trainings = trainings.slice(start, start + limit);

  res.json({ trainings, total, page, limit });
});

// Get training by ID
router.get('/:trainingId', (req, res: Response) => {
  const { trainingId } = req.params;

  for (const position of POSITIONS_DATA) {
    const training = position.treinos.find(t => t.id === trainingId);
    if (training) {
      return res.json({
        ...training,
        position: { id: position.id, nome: position.nome, abreviacao: position.abreviacao, cor: position.cor }
      });
    }
  }

  res.status(404).json({ error: 'Training not found' });
});

export default router;
