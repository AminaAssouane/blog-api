const express = require("express");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

app.use(express.json());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occurred : ", error);
  else console.log(`Server running on port ${PORT}`);
});
