import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import MongoClient from 'mongodb';
import PersonDAO from './models/person';
import TransactionDAO from './models/transaction';
import AccountDAO from './models/account';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

/** Class to configure and init application */
export default class App {
  private static app: any;
  private static server: any;

  /* Swagger files start */
  private static swaggerFile: any;
  private static swaggerData: any;
  private static swaggerDocument: any;

  /** */
  public static async init(): Promise<boolean> {
    try {
      this.app = express();
      this.server = http.createServer(this.app);
      this.swaggerFile = process.cwd() + '/swagger.json';
      this.swaggerData = fs.readFileSync(this.swaggerFile, 'utf8');
      this.swaggerDocument = JSON.parse(this.swaggerData);
      return true;
    } catch (error) {
      console.error(`Unable to init app: ${error}`);
      return false;
    }
  }

  /** */
  public static async startDependencies(): Promise<boolean> {
    try {
      this.app.use(cors());
      this.app.options('*', cors());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use('/api/v1', router);
      // swagger docs
      this.app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(this.swaggerDocument)
      );
      return true;
    } catch (error) {
      console.error(`Unable to start dependencies: ${error}`);
      return false;
    }
  }

  /** */
  public static async initDatabase(url: string): Promise<boolean> {
    try {
      await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(async function (conn: any) {
        const database: any = await conn.db('bank');
        await PersonDAO.injectDb(database);
        await TransactionDAO.injectDb(database);
        await AccountDAO.injectDb(database);
      });
      return true;
    } catch (error: unknown) {
      console.error(`Unable to start database: ${error}`);
      return false;
    }
  }

  /** */
  public static async startServer(port: number): Promise<boolean> {
    try {
      this.server.listen(port);
      console.log('Server listen on port: [3000]');
      return true;
    } catch (error) {
      console.error(`Unable to listen server: ${error}`);
      return false;
    }
  }
}
