require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connexion OK'); process.exit(0); })
  .catch(err => { console.error('Erreur connexion:', err); process.exit(1); });