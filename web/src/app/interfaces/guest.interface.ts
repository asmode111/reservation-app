import { Reservation } from "./";

export interface Guest {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  reservations: Reservation[];
}