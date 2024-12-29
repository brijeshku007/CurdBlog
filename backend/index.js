const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.get("/",(req,res)=>{
  res.send("Hello World");
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.error(err));
