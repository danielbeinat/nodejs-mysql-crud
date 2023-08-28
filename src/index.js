import express from "express";
import employee from "./routes/employee.routes.js";
import indexRoutes from "./routes/index.routes.js";
import { PORT } from "./config.js";
const app = express();

app.use(express.json());

app.use(employee);
app.use(indexRoutes);

app.listen(PORT);
console.log(`escuchando en el puerto ${PORT}`);
