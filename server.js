// Import express
import express from "express";
const app = express();

app.use(express.json());

// Import Auth router
import authRouter from "./routers/authRouter.js";
import categoryRouter from "./routers/categoryRouter.js";

app.use("/api/v1", authRouter);
app.use("/api/v1/category", categoryRouter);

app.listen(9000, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("server is running at port 9000");
  }
});
