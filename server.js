const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

console.log(port);

(async () => {
  await mongoose.connect(process.env.MOGNO_URI);
  console.log("Mongodb connected");
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
