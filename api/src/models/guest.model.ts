import { Model, DataTypes } from 'sequelize';
import Database from '../config/database.config';

class Guest extends Model {
  declare id: number;
  declare first_name: string;
  declare middle_name: string;
  declare last_name: string;
  declare email_address: string;
  declare phone_number: string;
}

Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    email_address: {
      type: DataTypes.STRING,
      defaultValue: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'guests',
  }
);

export default Guest;
