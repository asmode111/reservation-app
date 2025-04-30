import { Guest } from './';
import { Reservation } from './';

export const initAssociations = () => {
  Guest.hasMany(Reservation, { foreignKey: 'guest_id', as: 'reservations' });
  Reservation.belongsTo(Guest, { foreignKey: 'guest_id', as: 'guest' });
};