import { Request, Response } from 'express';
import { ISuccessResponse } from '../interfaces';
import * as guestsService from '../services/guests/search.service';
import { GuestSearchParamBuilder } from '../builder/guests-search-param.builder';
import { EBookingStatus } from '../enum';

export const guestsAction = async (req: Request, res: Response) => {
  try {
    const builder = new GuestSearchParamBuilder()
      .setFirstName(String(req.query.first_name ?? ''))
      .setMiddleName(String(req.query.middle_name ?? ''))
      .setLastName(String(req.query.last_name ?? ''))
      .setEmailAddress(String(req.query.email_address ?? ''))
      .setPhoneNumber(String(req.query.phone_number ?? ''))
      .setBookingReference(String(req.query.booking_reference ?? ''))
      .setOffset(Number(req.query.offset ?? 0));

    if (req.query.status && Object.values(EBookingStatus).includes(String(req.query.status) as EBookingStatus)) {
      builder.setStatus(String(req.query.status) as EBookingStatus);
    }

    const data = await guestsService.search(builder);

    const response: ISuccessResponse = {
      status : "success",
      data: data
    };
    res.status(201).json(response);
  } catch {
    res.status(500).json(
      {
        status : "error",
        error: {
          message: 'Failed to get data',
          details: {}
        } 
      }
    );
  }
};
