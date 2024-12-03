const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let vendors = [];

app.post('/api/vendors', async (req, res) => {
  const { name, email, password } = req.body;

  
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Please enter name of vendor' });
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  
  try {
    const hashedPassword = await bcrypt.hash(password, 6); 

    const newVendor = {
      id: vendors.length + 1,
      name,
      email,
      password: hashedPassword, 
    };

    vendors.push(newVendor);

    res.status(200).json(newVendor);
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


