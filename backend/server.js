console.log("🔥 CORRECT SERVER.JS IS RUNNING 🔥");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

console.log("Registering /api/transactions route");
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/expenseTracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Expense Tracker API running");
});


// 🔥 THIS IS WHAT WAS MISSING / BROKEN
const transactionRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionRoutes);


// if (mongoose.connection.readyState === 0) {
// mongoose
//   .connect("mongodb://127.0.0.1:27017/expense-tracker")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));
// }

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



app.listen(4000, () => {
  console.log("Server running on port 4000");
});




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const transactionRoutes = require("./routes/transactions");

// const app = express();
// const PORT = 4000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // routes
// console.log("Registering /api/transactions route");
// app.use("/api/transactions", transactionRoutes);

// // DB connection — ONLY ONCE
// mongoose
//   .connect("mongodb://127.0.0.1:27017/expense-tracker")
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
