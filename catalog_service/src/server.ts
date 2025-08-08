import app from "./app";
import { logger } from "./utils";

export const startServer = async () => {
  const port = 8080;
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

startServer().then(() => {
  logger.info("Catalog Service started successfully!");
});
