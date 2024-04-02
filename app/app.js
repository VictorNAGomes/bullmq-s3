const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
import { Queue, Worker } from "bullmq";
const queue = new Queue("Queue");

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get("/", async (req, res) => {
  res.json(`Get successfully`);
});

app.post("/add-queue", async (req, res) => {
  queue.add("test", { ...req.body });
  res.json("Adicionado na fila");
});

const worker = new Worker("Queue", async (job) => {
  return "processando";
});
