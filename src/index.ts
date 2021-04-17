import App from './app';

async function startApp(): Promise<boolean> {
  try {
    const url =
      process.env.URL_DATABASE ||
      'mongodb+srv://dock-user:123Pipoca@cluster0.qttvy.mongodb.net/bank?retryWrites=true&w=majority';
    const port = Number(process.env.APP_PORT) || 3000;
    await App.init();
    await App.startDependencies();
    await App.initDatabase(url);
    await App.startServer(port);
    return true;
  } catch (error) {
    console.error(`Unable to start app: ${error}`);
    return false;
  }
}

startApp();
