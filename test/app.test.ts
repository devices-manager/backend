import App from "../src/app";

describe('App Tests', () => {
  
  it("INIT APP", async () => {
    const res = await App.init();
    expect(res).toBe(true);
  });
  
  it("START DEPENDENCIES", async () => {
    const res = await App.startDependencies();
    expect(res).toBe(true);
  });
  
  it("INIT DATABASE WITH CORRECT STRING", async () => {
    const databaseURL = process.env.URL_DATABASE ||
    'mongodb+srv://dock-user:123Pipoca@cluster0.qttvy.mongodb.net/bank?retryWrites=true&w=majority';
    const res = await App.initDatabase(databaseURL);
    expect(res).toBe(true);
  });
  
  it("INIT DATABASE WITH FALSE STRING", async () => {
    const databaseURL = process.env.URL_DATABASE ||
    'mongodb+srv://cuen';
    const res = await App.initDatabase(databaseURL);
    expect(res).toBe(false);
  });
  
  it("START SERVER", async () => {
    const port = 5000;
    const res = await App.startServer(port);
    expect(res).toBe(true);
  });
  
  it("START SERVER ERROR", async () => {
    const port = 0;
    const res = await App.startServer(port);
    expect(res).toBe(false);
  });
});