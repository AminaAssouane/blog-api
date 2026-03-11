require("dotenv/config");
const express = require("express");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

app.use(cors()); // allows requests from any origin

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/login", authRouter);
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occurred : ", error);
  else console.log(`Server running on port ${PORT}`);
});
