import App from './app';

function startApp(): boolean {
  try {
    const port = Number(process.env.APP_PORT) || 3000;
    App.init();
    App.startDependencies();
    App.startServer(port);
    return true;
  } catch (error) {
    console.error(`Unable to start app: ${error}`);
    return false;
  }
}

startApp();
