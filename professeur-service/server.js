const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;
const DBNAME = process.env.DATABASE;
mongoose.connect(`${MONGODB_URL}/${DBNAME}`)
.then(() => console.log('Your Connexion To MongoDB Is Successful (❁´◡`❁)'))
.catch(err => console.error('Error connectiong to MongoDB:', err));
const db=mongoose.connection;

app.use("/professeurs", courseRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Course-Service running on port ${PORT}`));
