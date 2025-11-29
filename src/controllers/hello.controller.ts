import { type Request, type Response} from "express";

const helloController = (_: Request, res: Response) => {
  res.send("Hello from the hello controller file!");
};

export default helloController;
