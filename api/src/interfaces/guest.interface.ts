import { Reservation } from "./index";

/**
 * Guest data object.
 */
export interface Guest {
  /** The unique identifier for the guest. */
  id: number;

  /** The guest's first name. */
  first_name: string;

  /** The guest's middle name. */
  middle_name: string;

  /** The guest's last name. */
  last_name: string;

  /** The guest's primary email address. */
  email_address: string;

  /** The guest's primary phone number. */
  phone_number: string;

  /** The guest's reservations. A guest may have zero, one, or more reservations. */
  reservations: Reservation[];
}