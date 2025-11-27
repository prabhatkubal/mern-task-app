require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) return console.error('MONGO_URI is not set in .env');
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('MongoDB connection OK');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } finally {
    await client.close();
  }
})();
