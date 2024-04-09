import express from "express";
import multer from "multer";
const port = process.env.PORT || 3000;
import { Queue } from "bullmq";
export const redisOptions = { host: "redis", port: 6379 };

const app = express();
const upload = multer({ dest: "uploads/" });

const myQueue = new Queue("myQueue", { connection: redisOptions });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get("/", async (req, res) => {
  res.json(`Get successfully`);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  // myQueue.add("test", { ...req.body });
  // res.json("Adicionado na fila");
});

// const worker = new Worker("Queue", async (job) => {
//   return "processando";
// });
