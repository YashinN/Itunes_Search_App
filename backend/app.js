const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
// imports routes.
const searchRoutes = require("./routes/favouriteRoutes");
// sets default port
const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");
// uses helmet for app security.
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", searchRoutes);

// starts server and logs if running.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
