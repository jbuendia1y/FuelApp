import { Router } from "express";

const HelloRouter = Router();

HelloRouter.get("", (req, res) => {
  res.send("HELLO WORLD");
});

export default HelloRouter;
