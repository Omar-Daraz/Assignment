import dotenv from "dotenv";
import express, {Express} from "express";
import {createServer} from "http";
import {database} from "./provider";
import routes from "./routes";

// import routes from "./routes";

dotenv.config();
database();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST ? String(process.env.HOST) : "localhost";
const app: Express = express();

app.use(express.json());

const httpServer = createServer(app);

app.use("/api/users", routes.userRoutes);
app.use("/api/tasks", routes.taskRoutes);

httpServer.listen(port, host, () => {
  console.log(`The server is running on port ${port}`);
});
