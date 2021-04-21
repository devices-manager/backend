import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE || 'database',
  process.env.DBUSER || 'root',
  process.env.DBPASS || '',
  {
    host: process.env.DBHOST,
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    }
  }
);

sequelize.sync({ alter: true });

export default sequelize;
