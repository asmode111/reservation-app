import { Model, DataTypes } from 'sequelize';
import Database from '../config/database.config';
import Guest from './guest.model';
import { EBookingStatus } from '../enum';

class Reservation extends Model {
  declare booking_reference: string;
  declare status: string;
}

Reservation.init(
  {
    booking_reference: {
      type: DataTypes.STRING,
      defaultValue: false,
      unique: true,
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Guest, key: 'id' },
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        EBookingStatus.Confirmed, 
        EBookingStatus.Cancelled, 
        EBookingStatus.CheckedIn, 
        EBookingStatus.CheckedOut
      ]
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'reservations',
    indexes: [
      {
        name: 'idx_booking_reference',
        fields: ['booking_reference']
      }
    ]
  }
);

Reservation.sync();

export default Reservation;
