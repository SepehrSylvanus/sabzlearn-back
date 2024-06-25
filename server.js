const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

console.log(port);

(async () => {
  await mongoose.connect(process.env.MOGNO_URI);
  console.log("Mongodb connected");
})();

app.get("/", (req, res) => {
  console.log("Headers ==>", req.header("Authorization").split(" ")[1]);

  res.json({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
