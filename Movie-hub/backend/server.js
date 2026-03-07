require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/DB");

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:3000`);
});
