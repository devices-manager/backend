import { Request, Response } from 'express';
import { CategoryDAO } from '../dao/index';

export function create(req: Request, res: Response) {
  return CategoryDAO.create(req.body.data)
    .then((category) => res.status(201).send(category))
    .catch((error) => res.status(500).json({ error: error }));
}

export function list(_: Request, res: Response) {
  return CategoryDAO.findAll()
    .then((categories) => res.status(201).send(categories))
    .catch((error) => res.status(500).json({ error: error }));
}

export function listOne(req: Request, res: Response) {
  return CategoryDAO.findById(req.body.data)
    .then((category) => res.status(201).send(category))
    .catch((error) => res.status(500).json({ error: error }));
}

export function remove(req: Request, res: Response) {
  return CategoryDAO.remove(req.body.data)
    .then((category) => res.status(201).send(category))
    .catch((error) => res.status(500).json({ error: error }));
}
