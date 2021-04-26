import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

/** Class to configure and init application */
export default class App {
  private static app: any;
  private static server: any;

  /* Swagger files start */
  private static swaggerFile: any;
  private static swaggerData: any;
  private static swaggerDocument: any;

  /** */
  public static init(): boolean {
    try {
      this.app = express();
      this.server = http.createServer(this.app);
      this.swaggerFile = path.resolve('./swagger.json');
      this.swaggerData = fs.readFileSync(this.swaggerFile, 'utf8');
      this.swaggerDocument = JSON.parse(this.swaggerData);
      return true;
    } catch (error) {
      console.error(`Unable to init app: ${error}`);
      return false;
    }
  }

  /** */
  public static startDependencies(): boolean {
    try {
      this.app.use(cors());
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
  public static startServer(port: number): boolean {
    try {
      this.server.listen(port);
      console.log(`Server listen on port: [${port}]`);
      return true;
    } catch (error) {
      console.error(`Unable to listen server: ${error}`);
      return false;
    }
  }
}
