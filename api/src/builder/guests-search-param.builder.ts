import { Defaults } from '../constants';
import { EBookingStatus } from '../enum';

export class GuestSearchParamBuilder {
  private firstName: string = '';
  private middleName: string = '';
  private lastName: string = '';
  private emailAddress: string = '';
  private phoneNumber: string = '';
  private bookingReference: string = '';
  private status: EBookingStatus | string = '';
  private offset: number = Defaults.SEARCH_RESULT_LIMIT;

  setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }
  
  setMiddleName(middleName: string): this {
    this.middleName = middleName;
    return this;
  }

  setLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  setEmailAddress(emailAddress: string): this {
    this.emailAddress = emailAddress;
    return this;
  }

  setPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
    return this;
  }
  
  setBookingReference(bookingReference: string): this {
    this.bookingReference = bookingReference;
    return this;
  }
  
  setStatus(status: EBookingStatus): this {
    this.status = status;
    return this;
  }
  
  setOffset(offset: number): this {
    this.offset = offset;
    return this;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getMiddleName(): string {
    return this.middleName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmailAddress(): string {
    return this.emailAddress;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getBookingReference(): string {
    return this.bookingReference;
  }

  getStatus(): EBookingStatus | string {
    return this.status;
  }

  getOffset(): number {
    return this.offset;
  }
}