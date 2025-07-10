const mongoose = require('mongoose');
require('dotenv').config();

class DataAccess {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      this.db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async clearDatabase() {
    await mongoose.connection.dropDatabase();
  }
}

module.exports = new DataAccess();