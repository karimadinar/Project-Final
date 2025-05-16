const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const houseRouter = require("./routes/houseRoutes");
const favoriteRouter = require("./routes/favoriteRouter");
const adminRouter = require ("./routes/adminRouter");
const Reservations = require("./routes/reservations")

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/houses", houseRouter);
app.use("/api/favorites",favoriteRouter);
app.use("/api/admin",adminRouter);
app.use("/api/reservations",Reservations)

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
