const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});
const app = require('./index');

// Connect Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Successfully Connected');
  });

// Start Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
