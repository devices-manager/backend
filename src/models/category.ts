import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';

export interface CategoryAttributes {
  id?: number;
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'Category'
  }
);
