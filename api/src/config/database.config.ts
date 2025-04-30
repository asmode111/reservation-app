import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

class Database {
  private static instance: Sequelize;

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    }

    return Database.instance;
  }
}

export default Database;