import Guest from './guest.model';
import Reservation from './reservation.model';
import { initAssociations } from './associations';
initAssociations();

export { Guest, Reservation };
