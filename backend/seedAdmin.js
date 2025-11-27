// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('Please set MONGO_URI in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'admin@local.test' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
  }

  const admin = new User({
    name: 'Admin',
    email: 'admin@local.test',
    password: 'AdminPass123', // will be hashed by pre-save hook
    role: 'admin'
  });

  await admin.save();
  console.log('Created admin user: admin@local.test / AdminPass123');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
