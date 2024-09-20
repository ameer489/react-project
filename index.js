const express =require("express");
const app=express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose =require("mongoose");
const path =require("path");
const cors = require('cors');
const multer = require('multer');

const employeeRoutes = require('./routers/employeeRoutes');

app.use(express.static(path.join(__dirname, 'public')));

app.set("view",path.join(__dirname,"views"));
app.set("view engine","ejs");
main().then(()=>{console.log("connection successsull")})
.catch(err => console.log(err));
//user schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/employees', employeeRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/employees');
}


app.get('/api/data', (req, res) => {
    res.send({ message: 'Hello from backend!' });
    console.log('API hit');
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await Employee.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Here you would typically check the password
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });
  
      res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send({ message: 'Server error' });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, course, image } = req.body;
      // Check if user already exists
      const existingUser = await Employee.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
  
      // Create a new employee
      const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
      await newEmployee.save();
  
      res.status(201).send(newEmployee);
    } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).send({ message: 'Server error' });
    }
  });
  
app.get("/",(req,res)=>{
    res.send("root is working");
});
// app.use((req, res, next) => {
//     res.status(404).send("Sorry, that route doesn't exist.");
// });
app.listen(8080,()=>{
    console.log("serever is working in port is:8080")
});
