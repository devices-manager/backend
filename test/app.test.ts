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