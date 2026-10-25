import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

async function main() {
  const db = new PGlite("./pgdata-staging");
  const server = new PGLiteSocketServer({ db, port: 5433, host: "127.0.0.1" });
  await server.start();
  console.log("PGLITE_POSTGRESQL_READY:127.0.0.1:5433");

  const cleanup = async () => {
    console.log("Stopping PGLite socket server...");
    await server.stop();
    await db.close();
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("message", (msg) => {
    if (msg === "shutdown") cleanup();
  });
}

main().catch((err) => {
  console.error("Failed to start PGLite server:", err);
  process.exit(1);
});
