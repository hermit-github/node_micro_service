import app from "./app";
import { logger } from "./utils";

export const startServer = async () => {
  const port = process.env.APP_PORT || 9000;
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

startServer().then(() => {
  logger.info("Order Service started successfully!");
});
