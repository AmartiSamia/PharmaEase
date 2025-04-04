const express = require("express");
const path = require("path");
const PharmaciesAPI = require("./API/Pharmacies");

const app = express();
const PORT = process.env.PORT || 3003;

// Serve the React application
app.use(express.static(path.join(__dirname)));

// Serve the API
app.use("/api/pharmacies", PharmaciesAPI);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
