import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemaFiles/schema.js";
import colors from "colors";
import { connectToDb } from "./config/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectToDb();

app.use(cors());
app.use(morgan("short"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // graphiql will only be available in the development mode now
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
