import { Category, CategoryAttributes } from '../models/category';

export function create(category: CategoryAttributes): Promise<any> {
  return Category.create({
    name: category.name
  });
}

export function findById(categoryId: number): Promise<any> {
  return Category.findOne({
    where: {
      id: categoryId
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
