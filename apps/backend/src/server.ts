import express, { Express } from "express";
import HelloRouter from "./apiServices/hello";

class App {
  private server: Express;
  private port: number = 3001;

  constructor(_server: Express) {
    this.server = _server;
    this.routers();
    if (process.env.PORT) this.port = parseInt(process.env.PORT);
  }

  public routers() {
    this.server.use("/", HelloRouter);
  }

  public init(callback?: () => void) {
    this.server.listen(this.port, () => {
      if (callback) callback();
    });
  }
}

export default new App(express());
