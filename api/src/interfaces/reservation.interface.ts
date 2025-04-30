import { EBookingStatus } from "../enum";

export interface Reservation {
  /** The booking reference for the reservation. */
  booking_reference: string;

  /** The status of the reservation */
  status: 
    EBookingStatus.Confirmed 
    | EBookingStatus.Cancelled 
    | EBookingStatus.CheckedIn 
    | EBookingStatus.CheckedOut;
}