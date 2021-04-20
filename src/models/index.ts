import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE || 'database',
  process.env.DBUSER || 'root',
  process.env.DBPASS || '',
  {
    host: process.env.DBHOST,
    dialect: 'mysql'
  }
);

sequelize.sync({ alter: true });

export default sequelize;
