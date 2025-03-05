const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shyam:Shyam%40mongodb@cluster0.nmbgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model for the form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    zip: String,
    service: String,
    bedrooms: String,
    bathrooms: String,
    electricianService: String,
    electricianHours: String,
    plumbingService: String,
    plumbingIssues: String,
    preferredDate: String,
    preferredTime: String,
});

const FormData = mongoose.model('FormData', formSchema);

// Routes
app.post('/submit', async (req, res) => {
    const formData = new FormData(req.body);
    try {
        await formData.save();
        res.status(201).send('Form data saved successfully');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send('Error saving form data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});