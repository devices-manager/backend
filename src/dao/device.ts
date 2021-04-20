// import { Category } from '../models/category';
import { Device, DeviceAttributes } from '../models/device';

export function create(device: DeviceAttributes): Promise<any> {
  return Device.create({
    categoryId: device.categoryId,
    color: device.color,
    partNumber: device.partNumber
  });
}

export function findById(device: DeviceAttributes): Promise<any> {
  return Device.findOne({
    where: {
      id: device.id
    }
  });
}

export function findAll(): Promise<any> {
  return Device.findAll({ include: [{ all: true }] });
}

export function remove(device: DeviceAttributes): Promise<any> {
  return Device.destroy({
    where: {
      id: device.id
    }
  });
}
