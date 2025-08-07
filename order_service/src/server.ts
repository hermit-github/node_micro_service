import app from "./app";

export const startServer = async () => {
  const port = process.env.APP_PORT || 9000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

startServer().then(() => {
  console.log("Order Service started successfully!");
});
