const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://admin:stag123@cluster0.vubda52.mongodb.net/gymdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Enquiry Schema and Model
const enquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// Enquiry Route
app.post('/enquiry', async (req, res) => {
  try {
    console.log("Received form data:", req.body); // 🔍

    const { name, phone, email, message } = req.body;

    if (!mongoose.connection.readyState) {
      throw new Error("MongoDB is not connected");
    }

    const newEnquiry = new Enquiry({ name, phone, email, message });
    await newEnquiry.save();

    console.log("✅ Saved enquiry:", newEnquiry);
    res.status(200).send("Enquiry submitted successfully!");
  } catch (error) {
    console.error("❌ Error saving enquiry:", error.message);
    res.status(500).send("Failed to submit enquiry.");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
