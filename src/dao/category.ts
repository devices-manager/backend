import { Category, CategoryAttributes } from '../models/category';

export function create(category: CategoryAttributes): Promise<any> {
  return Category.create({
    name: category.name
  });
}

export function findById(category: CategoryAttributes): Promise<any> {
  return Category.findOne({
    where: {
      id: category.id
    }
  });
}

export function findAll(): Promise<any> {
  return Category.findAll();
}

export function remove(category: CategoryAttributes): Promise<any> {
  return Category.destroy({
    where: {
      id: category.id
    }
  });
}
