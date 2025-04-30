import dotenv from 'dotenv';
dotenv.config();

import app from './app'
import Database from './config/database.config';
const PORT: number = parseInt(process.env.PORT || '3000');

async function startServer() {
  await Database.getInstance().authenticate();
  await Database.getInstance().sync({
    force: true
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();