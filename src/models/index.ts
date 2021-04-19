import { Sequelize } from 'sequelize';

const config = require('../../config/config.json');

const dbConfig = config['development'];

const sequelize = new Sequelize(
    dbConfig['database'],
    dbConfig['username'],
    dbConfig['password'],
    {
        host: dbConfig['host'],
        dialect: dbConfig['dialect']
    }
);

sequelize.sync({alter: true});

export default sequelize;