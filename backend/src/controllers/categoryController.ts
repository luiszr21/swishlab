import { Request, Response } from 'express';
import { getCategories } from '../models/catalogModel';

export function listCategories(_req: Request, res: Response) {
  return res.json({ categories: getCategories() });
}