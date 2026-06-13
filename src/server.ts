import "dotenv/config";
import app from "./app";
import { connectDB } from "./database/connection";

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3030;

  app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
