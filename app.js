const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occurred : ", error);
  else console.log(`Server running on port ${PORT}`);
});
