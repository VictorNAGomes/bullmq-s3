import express from "express";
import multer from "multer";
const port = process.env.PORT || 3000;
import { Queue, Worker } from "bullmq";
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
  const { file } = req;

  if (!file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  myQueue.add("upload", {
    filename: file.originalname,
    filePath: file.path,
    bucketName: "post-images",
  });

  res.json("Arquivo adicionado na fila");
});

const worker = new Worker(
  "myQueue",
  async (job) => {
    console.log("executando");
    return job;
  },
  { connection: redisOptions }
);
