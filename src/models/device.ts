import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import { Category } from './category';

export interface DeviceAttributes {
    id?: number;
    categoryId: number;
    color: string;
    partNumber: number;
}

interface DeviceCreationAttributes extends Optional<DeviceAttributes, "id"> {}

export class Device extends Model<DeviceAttributes, DeviceCreationAttributes> implements DeviceAttributes {
    public id!: number;
    public categoryId!: number;
    public color!: string;
    public partNumber!: number;
}

Device.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Category,
                key: "id"
            }
        },
        color: {
            type: new DataTypes.STRING(16),
            allowNull: false
        },
        partNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'Device'
    }
);

sequelize.models.Device.belongsTo(Category, {
    as: "Category",
    foreignKey: "categoryId"
});