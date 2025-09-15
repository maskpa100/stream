// server.ts
import express from "express";
import cors from "cors";



const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});
const PORT = 5000;

app.get("/stream", (req, res) => {
  // Заголовки для стриминга
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  let i = 0;
  const interval = setInterval(() => {
    i++;
    res.write(`Сообщение №${i}\n`);
    if (i >= 10) {
      clearInterval(interval);
      res.end("=== Конец потока ===");
    }
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
