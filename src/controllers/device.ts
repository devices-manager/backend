import { Request, Response } from 'express';
import { DeviceDAO } from '../dao/index';

export function create(req: Request, res: Response) {
  return DeviceDAO.create(req.body.data)
    .then((device) => res.status(201).send(device))
    .catch((error) => res.status(500).json({ error: error }));
}

export function list(_: Request, res: Response) {
  return DeviceDAO.findAll()
    .then((devices) => res.status(201).send(devices))
    .catch((error) => res.status(500).json({ error: error }));
}

export function listOne(req: Request, res: Response) {
  return DeviceDAO.findById(req.body.data)
    .then((device) => res.status(201).send(device))
    .catch((error) => res.status(500).json({ error: error }));
}

export function remove(req: Request, res: Response) {
  return DeviceDAO.remove(req.body.data)
    .then((device) => res.status(201).send(device))
    .catch((error) => res.status(500).json({ error: error }));
}
